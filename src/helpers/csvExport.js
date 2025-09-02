import { Storage } from "@aws-amplify/storage";

export const getPublicImageUrl = async (imageSrc) => {
    if (!imageSrc) return '';
    
    try {
        let data = JSON.parse(imageSrc);
        if (data.imageSrc) {
            // this means the whole object was passed to you.
            if (data.imageSrc.slice(0, 4) === 'http') {
                return data.imageSrc;
            } else {
                data = JSON.parse(data.imageSrc);
            }
        }
        if (data.customKey) {
            const url = await Storage.get(data.customKey, {
                level: 'public',
                download: false,
            });
            return url;
        }
    } catch(e) {
        // If JSON parsing fails, return the src as-is (might be a direct URL)
        return imageSrc;
    }
    
    return imageSrc;
};

export const processWishlistItemsToCSV = async (wishlistItems) => {
    if (!wishlistItems || wishlistItems.length === 0) {
        return '';
    }

    // CSV Headers
    const headers = [
        'name',
        'price', 
        'linkUrl',
        'description',
        'imageUrl'
    ];

    const csvRows = [headers.join(',')];

    // Process each wishlist item
    for (const item of wishlistItems) {
        // Process images to get public URLs - take first image only
        let imageUrl = '';
        if (item.images && item.images.length > 0) {
            imageUrl = await getPublicImageUrl(item.images[0]);
        }
        
        // Escape CSV values (wrap in quotes and escape quotes)
        const escapeCSV = (value) => {
            if (value == null) return '';
            const stringValue = String(value);
            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
        };

        const row = [
            escapeCSV(item.name),
            escapeCSV(item.price || ''),
            escapeCSV(item.link || ''),
            escapeCSV(item.note || ''),
            escapeCSV(imageUrl)
        ];

        csvRows.push(row.join(','));
    }

    return csvRows.join('\n');
};

export const downloadCSV = (csvContent, filename = 'wishlist-export.csv') => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
};

export const exportWishlistToCSV = async (wishlistItems) => {
    try {
        const csvContent = await processWishlistItemsToCSV(wishlistItems);
        if (csvContent) {
            const timestamp = new Date().toISOString().split('T')[0];
            downloadCSV(csvContent, `wishlist-export-${timestamp}.csv`);
            return { success: true };
        } else {
            return { success: false, error: 'No items to export' };
        }
    } catch (error) {
        console.error('Error exporting CSV:', error);
        return { success: false, error: error.message };
    }
};
import {DataStore} from "aws-amplify";

export default async function toggleAmplifyArrayItem(model, id, item, value) {
    const original = await DataStore.query(model, id);
    const oldValue = [...original[item]]
    if(oldValue.includes(value)) {
        oldValue.splice(oldValue.indexOf(value), 1)
    } else {
        oldValue.push(value)
    }
    const duplicatesRemoved = [...new Set(oldValue)]
    await DataStore.save(model.copyOf(original, updated => {
        try {
            updated[item] = duplicatesRemoved;
        } catch (e) {
            console.log(e)
        }
    }))
}

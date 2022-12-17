import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1000,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        textBlack: {
            main: '#000000'
        },
        white: {
            main: '#ffffff',
            darker: '#cccccc'
        },
        primary: {
            main: '#1E88E5',
            darker: '#187ad0',
        },
        secondary: {
            main: '#7e57c2',
            darker: '#6e43b9',
        },
        green: {
            main: '#44FFD2',
            darker: '#00a17a'
        },
        darkGreen: {
            main: '#00a17a',
            darker: '#00a17a',
        },
        deleteRed: {
            main: '#fd5858',
            darker: '#fd5858'
        }
    },
});

export default theme
//
// --primary-color: #1E88E5;
// --secondary-color: #7e57c2;
// --dark-color: #24292e;
// --background-color: #e3f2fd;
// --green-color: #44FFD2;
// --pink-color: #FF8484;

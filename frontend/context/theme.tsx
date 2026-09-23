'use client';

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    typography: {
        h1: {
            fontSize: 48
        },
        h2: {
            fontSize: 32
        },
        h3: {
            fontSize: 24
        },
        fontSize: 16
    },
    colorSchemes: {
        light: {
            palette: {
                background: {
                    default: "rgb(236, 252, 202)",
                    paper: "rgb(255,255,255)"
                },
                primary: {
                    main: "rgb(53, 83, 14)"
                }
            }
        }
    }
})
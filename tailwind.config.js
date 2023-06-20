/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            xs: "40px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
            "3xl": "2600px",
            tablet: "640px",
            laptop: "1024px",
            desktop: "1280px",
        },
        extend: {
            height: {
                screen: ["100vh /* fallback for Opera, IE and etc. */", "100svh"],
            },
            backgroundImage: {
                "hero-pattern": "url('/assets/vectors/HeroPattern.svg')",
                logo: "url('/assets/vectors/Logo.svg')",
                certificate: "url('/assets/images/Certificate.png')",
                "profile-pic": "url('/assets/images/ProfilePic.png')",
                "code-white": "url('/assets/images/CodeWhite.png')",
                projects: "url('/assets/images/Projects.png')",
            },
            animation: {
                "background-slide":
                    "bg-slide transition translate-x-100 duration-300 ease-in-out",
                "bg-rotate": "bg-slide 10s linear infinite",
                "bg-slide-out": "bg-out-keys 0.5s linear",
                "bg-slide-in": "bg-in-keys 0.5s linear",
            },
            keyframes: {
                "bg-in-keys": {
                    "0%": {
                        "background-size": "135%",
                        "background-position": "-500px 0",
                    },
                    "100%": {
                        "background-size": "135%",
                        "background-position": "center",
                    },
                },
                "bg-out-keys": {
                    "0%": {
                        "background-size": "135%",
                        "background-position": "center",
                    },
                    "100%": {
                        "background-size": "135%",
                        "background-position": "500px 0",
                    },
                },
            },
        },
        // extend: {
        //   backgroundImage: {
        //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        //     'gradient-conic':
        //       'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        //   },
        // },
    },
    plugins: [],
};

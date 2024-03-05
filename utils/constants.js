const defaultColors = {
    primary: "#90caf9",
    secondary: "#ce93d8",
    error: "#f44336",
    warning: "#ffa726",
    info: "#29b6f6",
    success: "#66bb6a"
}

const componentsCategories = ["Inputs", "DataDisplay", "Feedback", "Surfaces", "Navigation", "Layouts", "Switch"];

const installMUICommand = "@mui/icons-material @mui/material @emotion/styled @emotion/react";

const componentChoices = [
    { name: "App Bar", value: { name: "AppBar", category: "Inputs" } },
    { name: "AutoComplete", value: { name: "AutoComplete", category: "Inputs" } },
    { name: "Data Grid", value: { name: "DataGrid", category: "DataDisplay" } },
    { name: "Dates", value: { name: "Dates", category: "Inputs" } },
    { name: "Select", value: { name: "Select", category: "Inputs" } },
    { name: "Tabs", value: { name: "Tabs", category: "Navigation" } },
    { name: "Text Field", value: { name: "TextField", category: "Inputs" } },
    { name: "Alert", value: { name: "Alert", category: "Feedback" } },
    { name: "Dialog", value: { name: "Dialog", category: "Feedback" } },
    { name: "Linear Progress", value: { name: "LinearProgress", category: "Feedback" } },
    { name: "Snackbar", value: { name: "Snackbar", category: "Feedback" } },
    { name: "Accordion", value: { name: "Accordion", category: "Surfaces" } },
    { name: "Android Switch", value: { name: "AndroidSwitch", category: "Switch" } },
    { name: "Ant Switch", value: { name: "AntSwitch", category: "Switch" } },
    { name: "iOS Switch", value: { name: "iOSSwitch", category: "Switch" } },
    { name: "Material UI Switch", value: { name: "MaterialUISwitch", category: "Switch" } }
]

const projectStructure = `
project-root/
│
├── .gitignore                # Git ignore file
├── package.json              # Node.js package manifest
├── package-lock.json         # Locked versions of each package
├── README.md                 # Project readme
├── node_modules/             # Node.js modules (don't commit to version control)
│
├── public/                   # Public assets like favicon, index.html, etc.
│
├── src/
│   ├── components/
│   │   ├── Inputs/               # Components for user input
│   │   │   ├── TextField.js      # Text field input component
│   │   │   └── ...
│   │   │
│   │   ├── DataDisplay/          # Components to display data
│   │   │   ├── Table.js          # Table component for displaying rows of data
│   │   │   └── ...
│   │   │
│   │   ├── Feedback/             # Components that provide feedback
│   │   │   ├── Snackbar.js       # Snackbar component for temporary messages
│   │   │   └── ...
│   │   │
│   │   ├── Surfaces/             # Components that represent surfaces
│   │   │   ├── Card.js           # Card component for displaying content and actions on a single topic
│   │   │   └── ...
│   │   │
│   │   ├── Navigation/           # Components to navigate the app
│   │   │   ├── Drawer.js         # Drawer component for side navigation
│   │   │   └── ...
│   │   │
│   │   ├── Layouts/              # Components for layout and structure
│   │   │   ├── Grid.js           # Grid component for layout
│   │   │   └── ...
│   │   │
│   │   └── ...                   # Other component categories
│   │
│   ├── theme/                    # Theme configuration
│   │   ├── theme.js              # Main theme file
│   │   └── ...                   # Other theme-related configurations
│   │
│   ├── App.js                    # Main application component
│   ├── index.js                  # Entry point for the application
│   └── ...
│
├── .env                          # Environment variables
└── ...
`

const durationValidators = [
    {
        name: 'shortest',
        high: {
            value: 300,
            message: 'which might start to feel sluggish for elements meant to transition quickly, impacting the perceived responsiveness of the UI.'
        },
        low: {
            value: 100,
            message: 'this could make transitions nearly imperceptible, missing the visual feedback intention.'
        },
    },
    {
        name: 'shorter',
        high: {
            value: 350,
            message: 'which might unnecessarily delay user interactions for transitions intended to be quick.'
        },
        low: {
            value: 150,
            message: 'this could make transitions too quick to be meaningful, failing to provide clear visual cues.'
        },
    },
    {
        name: 'short',
        high: {
            value: 400,
            message: 'which could detract from user experience by making the UI feel slow for perceptible but efficient transitions.'
        },
        low: {
            value: 200,
            message: 'this may not provide enough time for users to recognize the transition, especially for interactions that are not the quickest.'
        },
    },
    {
        name: 'standard',
        high: {
            value: 450,
            message: 'which could make standard interactions feel unnecessarily protracted, leading to frustration.'
        },
        low: {
            value: 250,
            message: 'this might not sufficiently distinguish these transitions from the shorter ones, blurring the intended hierarchy of transition speeds.'
        },
    },
    {
        name: 'complex',
        high: {
            value: 500,
            message: 'which risks making the animation feel too slow, especially if used frequently, which can significantly impact user experience.'
        },
        low: {
            value: 325,
            message: 'this may not allow complex animations to fully convey their intended effect, potentially making the animation feel rushed.'
        },
    },
    {
        name: 'enteringScreen',
        high: {
            value: 375,
            message: 'which could delay the presentation of new content or functionality, making the app feel less responsive.'
        },
        low: {
            value: 175,
            message: 'this might not give users enough time to process the entrance of a new element, which should catch the user\'s attention.'
        },
    },
    {
        name: 'leavingScreen',
        high: {
            value: 345,
            message: 'which for elements leaving the screen could unnecessarily prolong the transition, delaying user engagement with remaining elements.'
        },
        low: {
            value: 145,
            message: 'this could make the dismissal of elements too abrupt, potentially confusing users about what just happened.'
        },
    }
];

module.exports = {
    defaultColors,
    durationValidators,
    installMUICommand,
    projectStructure,
    componentsCategories,
    componentChoices
};
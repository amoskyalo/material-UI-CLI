<h3 align="center">
	
[![mui_cli](https://img.shields.io/badge/-MATERIAL_UI_CLI-blue?style=for-the-badge&logo=mui&logoColor=D9E0EE)](https://github.com/amoskyalo/material-UI-CLI)
<a href="https://github.com/amoskyalo/material-UI-CLI/issues">
	<img alt="Issues" src="https://img.shields.io/github/issues/amoskyalo/material-UI-CLI?style=for-the-badge&logo=gitbook&color=cba6f7&logoColor=D9E0EE&labelColor=302D41"></a>
</h3>

<p align="center">
	A dedicated command-line interface tool crafted to augment the development experience with Material-UI, a popular React UI framework.
</p>

## ✨ Features
- Initialize projects.
- Generate theme file to an existing project.
- Validate theme file for your project to.
- Scaffold popular material UI components to your existing project.

## 📦 Installation
 
```sh
npm install -g mui-cli
```

## 🚀 Usage

### 1. 🦾 Create new project.

To initialize a new project, first navigate to the folder you want to initialize the project, then:

```sh
mui-cli project-init [options]
```

The following options can be passed to the initialization command:

| Option | Description |
| --- | --- |
| name `(required)` | Your project name |
| --all `(optional)` | Install all components flag |

This command will initialize a new React app using your default package manager, which will be auto-detected, eliminating the need for manual configuration.

If you include the `--all` flag, [all popular Material UI](https://github.com/amoskyalo/material-UI-CLI) components will be scaffolded into your project. Otherwise, it will prompt you to select the components you wish to include.

If everything proceeded smoothly, you'll receive a confirmation message indicating that your project setup is complete. Navigate to the project directory and execute the start script command. If you followed the procedure correctly, your project will initiate at `localhost:3000`, and the default landing page shown below will be displayed:

<img alt="Issues" height="200" src="https://github.com/amoskyalo/material-UI-CLI/assets/91586973/5ac71564-b546-4acb-8e22-40726a5e2ee3">

#### Initializing a new React project with the MUI CLI offers several advantages:

- 📦 Installs all Material UI-related dependencies, including MUI icons.
- ✅ Enables you to choose which Material UI components to scaffold into your project.
- ⚙️ Automatically generates a theme file.
- 🎨 Includes pre-configured Material UI theming.
- 🚀 Allows you to focus on development rather than setup.

#### The downside of using MUI CLI to initialize your project includes:

- ⚠️ It relies on **CRA**, which might be a drawback for those intending to use other tools like **Vite**.
- ⚠️ The scaffolded MUI components are written in **JavaScript**, which could be a downside for those using **TypeScript**.

The MUI CLI team is actively exploring the best ways to address these issues promptly to facilitate smoother development.

### 2. ⚙️ Generate theme file to an existing project.

Ensuring adherence to the correct MUI theming guidelines can sometimes be challenging. With MUI CLI, you can effortlessly generate a theme file that you can then customize to your preferences. To generate a `theme` file for your existing project, simply execute the following command:

```sh
mui-cli theme-init [options]
```

The following **options** can be passed to the command: 

| Option                       | Description              |
| -----------------------------|--------------------------|
| -p, --primary `(optional)`   | Primary color option     |
| -s, --secondary `(optional)` | Secondary color option   |
| -e, --error `(optional)`     | Error color option       |
| -w, --warning `(optional)`   | Warning color option     |
| -i, --info `(optional)`      | Info color option        |
| -x, --success `(optional)`   | Success color option     |

The `theme.js` file will be generated under `src > Theme` folder in your project. Note that only palette options can be passed as option.


### 3. 🔍 Validate theme file in existing project.

You can easily inspect your theme file to identify any potential errors or warnings that might have been overlooked. To inspect your theme file, simply execute the following command:

```sh
mui-cli theme-validate [options]
```

The following **options** can be passes to the command:

| Option                          | Description                                |
| ------------------------------- | ------------------------------------------ |
| -p, --palette `(optional)`      | Validate palette in your theme file        |
| -t, --typography `(optional)`   | Validate typography in your theme file     |
| -s, --spacing `(optional)`      | Validate spacing in your theme file        |
| -b, --breakpoints `(optional)`  | Validate breakpoints in your theme file    |
| -tr, --transitions `(optional)` | Validate transitions in your theme file    |
| --path `(optional)`             | Path to your theme file                    |
| --ignore-warn `(optional)`      | dont show warning                          |

If the `path` option is not provided, you will be prompted with a question to specify the path to your `theme file`.

If no other options are passed, all properties in your theme will be validated by default.

Upon inspecting your theme file, any potential errors will be displayed in your console, along with any potential warnings. To disregard warnings, you can include the `--ignore-warn` flag in the command.

> [!NOTE]<br>
> The contents of the theme file should be a function that returns the theme object. If the theme file is not a function, an error will occur. This is one of the limitations we are working to resolve.
> 
> The theme file can have the following format:
> ```JavaScript
> const themeConfig = () => ({
>   // Theme contents
> });
> ```

### 🧩 Popular MUI components

Here is a list of all popular components that are currently supported.

| Component                          | Description                                                              | Category       |
| ---------------------------------- | ------------------------------------------------------------------------ | -------------- |
| [App Bar](https://mui.com)         | Popular Material UI component for app bars.                              | Surfaces       |
| [AutoComplete](https://mui.com)    | Material UI component providing autocomplete functionality.              | Inputs         |
| [Data Grid](https://mui.com)       | Material UI component for displaying data grids.                         | DataDisplay    |
| [Dates](https://mui.com)           | Material UI component for selecting dates.                               | Inputs         |
| [Select](https://mui.com)          | Material UI component for selecting options from a list.                 | Inputs         |
| [Tabs](https://mui.com)            | Material UI component for organizing content into tabs.                  | Navigation     |
| [Text Field](https://mui.com)      | Material UI component for text input fields.                             | Inputs         |
| [Alert](https://mui.com)           | Material UI component for displaying alerts.                             | Feedback       |
| [Dialog](https://mui.com)          | Material UI component for displaying dialog boxes.                       | Feedback       |
| [Linear Progress](https://mui.com) | Material UI component for indicating progress linearly.                  | Feedback       |
| [Snackbar](https://mui.com)        | Material UI component for displaying snackbars.                          | Feedback       |
| [Accordion](https://mui.com)       | Material UI component for creating accordion-style content.              | Surfaces       |
| [Android Switch](https://mui.com)  | Material UI component for switches styled like those on Android devices. | Switch         |
| [Ant Switch](https://mui.com)      | Material UI component for switches styled like those in Ant Design.      | Switch         |
| [iOS Switch](https://mui.com)      | Material UI component for switches styled like those on iOS devices.     | Switch         |
| [MUI Switch](https://mui.com)      | Material UI default switch component.                                    | Switch         |

The components will be generated within the `src` folder, organized under the `Components` directory. Each component will have its own designated folder within the `Components` directory. For instance, the Autocomplete component will be created within the `Inputs` folder under `Components`. This organizational structure ensures clarity and maintainability, making it easy to locate and manage individual components within the project.

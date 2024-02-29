<h3 align="center">
	
[![mui_cli](https://img.shields.io/badge/-MATERIAL_UI_CLI-blue?style=for-the-badge&logo=mui&logoColor=D9E0EE)](https://github.com/amoskyalo/material-UI-CLI)
<a href="https://github.com/amoskyalo/material-UI-CLI/issues">
	<img alt="Issues" src="https://img.shields.io/github/issues/amoskyalo/material-UI-CLI?style=for-the-badge&logo=gitbook&color=cba6f7&logoColor=D9E0EE&labelColor=302D41"></a>
</h3>

<p align="center">
	A dedicated command-line interface tool crafted to augment the development experience with Material-UI, a popular React UI framework.
</p>

## ✨ Features
- Initialize projects
- Generate theme file.
- Validate theme file.
- Scaffold popular material ui components to your existing project

## 📦 Installation
 
```sh
npm install -g mui-cli
```

## 🚀 Usage

### 1. Create new project.

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

If you include the `--all` flag, all popular Material UI components will be scaffolded into your project. Otherwise, it will prompt you to select the components you wish to include.

##### Initializing a new React project with the MUI CLI offers several advantages:

- 📦 Installs all Material UI-related dependencies, including MUI icons.
- ✅ Enables you to choose which Material UI components to scaffold into your project.
- ⚙️ Automatically generates a theme file.
- 🎨 Includes pre-configured Material UI theming.
- 🚀 Allows you to focus on development rather than setup.

##### The downside of using MUI CLI to initialize your project includes:

- ⚠️ It relies on **CRA**, which might be a drawback for those intending to use other tools like **Vite**.
- ⚠️ The scaffolded MUI components are written in **JavaScript**, which could be a downside for those using **TypeScript**.

The MUI CLI team is actively exploring the best ways to address these issues promptly to facilitate smoother development.

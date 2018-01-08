/* eslint-disable class-methods-use-this */

// @flow
import { app, Menu, shell, BrowserWindow } from 'electron';
import { release } from 'os';

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      this.setupDevelopmentEnvironment();
    }

    const template = this.buildTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu
        .buildFromTemplate([{
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }])
        .popup(this.mainWindow);
    });
  }

  buildTemplate() {
    const subMenuAbout = {
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    };
    const subMenuEdit = {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    };
    const subMenuViewDev = {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'togglefullscreen' },
        { role: 'toggledevtools' }
      ]
    };
    const subMenuViewProd = {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'togglefullscreen' },
      ]
    };
    const subMenuWindow = {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
        { type: 'separator' },
        { role: 'front' }
      ]
    };
    const subMenuHelp = {
      role: 'help',
      submenu: [
        {
          label: 'Report Issue',
          click() {
            const body = `
<!--
  Hi there! Thank you for discovering and submitting an issue.
  Before you submit this; lets make sure of a few things.
  Please make sure the following boxes are ✅ if they are correct.
  If not, please try and fulfill these first.
-->

<!-- 👉 Checked checkbox should look like this: [x] -->
- [ ] Your Channels version is **${app.getVersion()}**. Please verify you're using the [latest](https://github.com/BuckyMaler/channels/releases/latest) Channels version.
- [ ] I have searched the [issues](https://github.com/BuckyMaler/channels/issues) of this repo and believe that this is not a duplicate.

- **${app.getName()} version**: ${app.getVersion()}
- **OS version and name**: ${release()} ${process.platform}
- **Electron version**: ${process.versions.electron || ''}
- **Relevant information from devtools** _(CMD+ALT+I)_: <!-- Replace with info if applicable, or N/A -->

## Issue
<!-- 👉 Now feel free to write your issue, but please be descriptive! Thanks again 🙌 ❤️ -->`;
            shell.openExternal(`https://github.com/BuckyMaler/channels/issues/new?body=${encodeURIComponent(body)}`);
          }
        },
        { type: 'separator' },
        { label: 'Follow The Developer...', click() { shell.openExternal('https://twitter.com/BuckyMaler'); } }
      ]
    };

    const subMenuView = process.env.NODE_ENV === 'development'
      ? subMenuViewDev
      : subMenuViewProd;

    return [
      subMenuAbout,
      subMenuEdit,
      subMenuView,
      subMenuWindow,
      subMenuHelp
    ];
  }
}

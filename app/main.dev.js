/* eslint-disable global-require, flowtype-errors/show-errors */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, autoUpdater, dialog } from 'electron';
import isDev from 'electron-is-dev';
import MenuBuilder from './menu';

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1038,
    height: 584,
    minWidth: 1038,
    minHeight: 584
  });

  mainWindow.setAspectRatio(16 / 9);

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  if (!isDev) {
    const server = 'https://hazel-server-inkdewafsz.now.sh';
    const feed = `${server}/update/${process.platform}/${app.getVersion()}`;

    autoUpdater.setFeedURL(feed);

    autoUpdater.on('update-downloaded', () => {
      const message = 'Would you like to install it now? It will be automatically installed after restart.';
      dialog.showMessageBox({
        type: 'question',
        buttons: ['Install and Relaunch', 'Later'],
        defaultId: 0,
        message: `A new version of ${app.getName()} has been downloaded!`,
        detail: message
      }, response => {
        if (response === 0) {
          setTimeout(() => autoUpdater.quitAndInstall(), 1);
        }
      });
    });

    const tenSeconds = 10000;
    const thirtyMinutes = 1800000;

    setTimeout(() => autoUpdater.checkForUpdates(), tenSeconds);
    setInterval(() => autoUpdater.checkForUpdates(), thirtyMinutes);
  }
});

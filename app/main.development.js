const { app, BrowserWindow, Menu, shell } = require('electron');

let menu;
let template;
let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


const installExtensions = () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload)));
  }

  return Promise.resolve([]);
};

app.on('ready', () =>
  installExtensions()
    .then(() => {
      mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728
      });

      mainWindow.loadURL(`file://${__dirname}/app.html`);

      mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.focus();
      });

      mainWindow.on('closed', () => {
        mainWindow = null;
      });

      if (process.env.NODE_ENV === 'development') {
        mainWindow.openDevTools();
        mainWindow.webContents.on('context-menu', (e, props) => {
          const { x, y } = props;

          Menu.buildFromTemplate([{
            label: 'Inspect element',
            click() {
              mainWindow.inspectElement(x, y);
            }
          }]).popup(mainWindow);
        });
      }

      if (process.platform === 'darwin') {
        template = [{
          label: 'Arborist',
          submenu: [{
            label: 'About Arborist',
            selector: 'orderFrontStandardAboutPanel:'
          }, {
            type: 'separator'
          }, {
            label: 'Services',
            submenu: []
          }, {
            type: 'separator'
          }, {
            label: 'Hide Arborist',
            accelerator: 'Command+H',
            selector: 'hide:'
          }, {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            selector: 'hideOtherApplications:'
          }, {
            label: 'Show All',
            selector: 'unhideAllApplications:'
          }, {
            type: 'separator'
          }, {
            label: 'Quit',
            accelerator: 'Command+Q',
            click() {
              app.quit();
            }
          }]
        }, {
          label: 'View',
          submenu: (true) ? [{
            label: 'Reload',
            accelerator: 'Command+R',
            click() {
              mainWindow.webContents.reload();
            }
          }, {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click() {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }, {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click() {
              mainWindow.toggleDevTools();
            }
          }] : [{
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click() {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }]
        }, {
          label: 'Window',
          submenu: [{
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
          }, {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
          }, {
            type: 'separator'
          }, {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
          }]
        }, {
          label: 'Help',
          submenu: [{
            label: 'Learn More',
            click() {
              shell.openExternal('http://360bonsai.com/?utm_source=arboristv2');
            }
          }, {
            label: 'Shop Bonsai',
            click() {
              shell.openExternal('http://www.360bonsai.com/shop?utm_source=arboristv2');
            }
          }, {
            label: 'Submit a Bug',
            click() {
              shell.openExternal('https://github.com/daviseford/arborist-v2/issues');
            }
          }]
        }];

        menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
      } else {
        template = [{
          label: '&File',
          submenu: [{
            label: '&Open',
            accelerator: 'Ctrl+O'
          }, {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click() {
              mainWindow.close();
            }
          }]
        }, {
          label: '&View',
          submenu: (true) ? [{
            label: '&Reload',
            accelerator: 'Ctrl+R',
            click() {
              mainWindow.webContents.reload();
            }
          }, {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click() {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }, {
            label: 'Toggle &Developer Tools',
            accelerator: 'Alt+Ctrl+I',
            click() {
              mainWindow.toggleDevTools();
            }
          }] : [{
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click() {
              mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
          }]
        }, {
          label: 'Help',
          submenu: [{
            label: 'Learn More',
            click() {
              shell.openExternal('http://360bonsai.com/?utm_source=arboristv2');
            }
          }, {
            label: 'Shop Bonsai',
            click() {
              shell.openExternal('http://www.360bonsai.com/shop?utm_source=arboristv2');
            }
          }, {
            label: 'Submit a Bug',
            click() {
              shell.openExternal('https://github.com/daviseford/arborist-v2/issues');
            }
          }]
        }];
        menu = Menu.buildFromTemplate(template);
        mainWindow.setMenu(menu);
      }
    }));

# openheroes2

My attempt of recreating Heroes of Might and Magic 2 game engine using TypeScript and Electron.JS. This is still very WIP.
The only runnable part is map editor and its under active development.

Preview screen:
https://s27.postimg.org/bnugx5qnn/Open_Heroes2_-_Editor_009.png

Note: this does not launch without original Heroes2 data files (Heroes2.agg, Heroes2x.agg)

In order to run it, clone repository, copy files from original Heroes2 data directory to ./data/heroes2/* and then:

```
npm install
npm run build-editor
npm run editor-dev
```

Code comments and refactoring is done every minor milestone.

Contact me: nullptr128@gmail.com

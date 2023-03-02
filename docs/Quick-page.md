---
sidebar_position: 0
---

# Quick page to show how to make one in the wiki

## Best way to edit and add pages

Get this:
https://github.com/FOME-Tech/FOME-Baseline/issues/labels

Clone the wiki repo
https://github.com/FOME-Tech/wiki

![image](Clone.JPG)

Get VScode:
https://code.visualstudio.com

Open Wiki in VScode from github desktop
![image](VScode.JPG)

Start work on the docs
![img](Docs.JPG)

Folders are creatable with a right click, they will show up like this in the wiki
![img](Folder.JPG)

Pages are creates with a right click and named xxxx.md, they will show up as pages in the wiki.

To make images work the images need to be in the same folder as the .md, they are also case sensitive so check capitals

This markdown cheat sheet will tell you everything you need to format pages

https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

Save your work in VScode and go to github desktop

It will ask you for a title, description and to commit the changes (see bottom left of picture)

![img](Commit.JPG)

Once that is done you can push your changes and they will get automatically updated to the wiki

![img](Push.JPG)

---

- Stuff!
- More stuff!
- Stuff that looks like stuff but isn't!

##### Subtitle

#### No not that kind of subtitle

### This kind of subtitle

You can also do **this** **[link](https://fome.tech)**

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.

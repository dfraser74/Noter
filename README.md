## Overview

A PWA for note taking.
Currently it's a "Work in progress".

* [Basic version](https://noter-1.firebaseapp.com/) - It contain service worker for off-line, manifest and a simple text area. All the basic functionality, that allow you to take notes the are saved automatically with or without connection. I used jQuery and bootstrap to keep it simple and to make it easy to extended it in the future.

* [Full version with Firebase](https://noter-1.firebaseapp.com/index-m.html) - Similar to the basic version, but this time, I added the ability to save the notes in Firebase. You can add notes, edit current ones and (of course) delete the ones that you don't really like. The text area was upgrades to a markdown editor. A simple one, but still something that will give you the ability to get a preview of the note in a markdown.
You can use: 
  * User: demo@demo.com 
  * Password: demo
In order to try it out.

![Noter PWA](https://noter-1.firebaseapp.com/noter-1-pwa-x.png)

## ToDos

### PWA
* [ ] Add build process (Gulp) - copy, minify etc'.
* [x] Use Service workers for caching and local saving of notes.
* [x] Add versions for the SW handling of assets.
* [x] Add manifest.
* [ ] Add push notifications on special notes that you mark with "todo".

### Noter Full
* [ ] Change the order of the notes (last should be on top of the list).
* [ ] Let the user search for notes.
* [ ] Sync with you have connection with firebase.
* [x] Add notification for 'wi-fi' or lie-fi.

### Sing-in
* [ ] Enable an option to use Facebook, Google, Twitter.

--
*Got more ideas?*
Please let me know.
![ideas-please](https://noter-1.firebaseapp.com/ideas-minions.png)
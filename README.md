# plantuml-watcher

### Why
PlantUML is neat but comes with some pre-reqs on the environment with the install of GraphViz (and Java). Also the ideal workflow when desiging locally with PlantUML is a bit unclear. This image is meant to be started in a local dev environment and it uses a file watcher to render/re-render diagrams when they are modified. It could also be used in a CI chain.

#### Usage
Initialize a file watcher from any directory.
```
$ docker run --rm -ti -v ${PWD}:/ws -w /ws oscarberg/plantuml-watcher
******************************************************************
plantuml-watcher watching for changes in .puml and .plantuml files
plantuml args: []
******************************************************************
watching: /ws/example.puml
```
It will wait for changes in plantuml files (.puml or .plantuml). Any change will trigger (re)draw of diagram to desired format.
```
change: /ws/example.puml
 > draw: /ws/example.puml
```
![Fancy diagram](https://raw.githubusercontent.com/oversizedhat/plantuml-watcher/main/Example%20diagram.png)

##### Advanced usage

Supports passing along additional flags to the plantuml jar. 

Useful ones like for example:  
**-tsvg** : Generate images using SVG format instead of the default PNG.  
**-progress** : Print the duration of complete diagrams processing.  
**-verbose** : Have log information.  
**-duration** : Print the duration of complete diagrams processing.  
**-h[help]** : Will give you the full list. Note that some of them wont work because off headless.  

And you can add:  
**--draw-on-add** to draw all watched on launch  
**--recursive** include subfolders

##### Advanced usage example
```
$ docker run --rm -ti -v ${PWD}:/ws -w /ws oscarberg/plantuml-watcher -duration -tsvg --draw-on-add --recursive
```

*Important note!* In some environments (at least **Windows**) docker volume mounts and file watching is not a perfect match. So if the file watching does not appear to be working it is possible to enable the file watcher (chokidar) to use polling.

```
# Windows CMD
$ docker run --rm -ti -v %cd%:/ws -e CHOKIDAR_USEPOLLING=true -w /ws oscarberg/plantuml-watcher

# Windows Powershell
$ docker run --rm -ti -v ${PWD}:/ws -e CHOKIDAR_USEPOLLING=true -w /ws oscarberg/plantuml-watcher
```

##### Why not go all the way and make an alias in your shell rc file?
```
#.zshrc
alias plantuml-watcher='docker run --rm -ti -v ${PWD}:/ws -w /ws oscarberg/plantuml-watcher'
```
Note the single quote. If you use double quote the PWD substition will happen at the time of the alias declaration.

And now finally..
```
$ plantuml-watcher
******************************************************************
plantuml-watcher watching for changes in .puml and .plantuml files
plantuml args: []
******************************************************************
watching: /ws/example.puml
```
Ahh.. serenity
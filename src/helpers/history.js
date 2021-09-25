const storage = window.sessionStorage;

function getOrCreateStorage(path){
    var data = JSON.parse(storage.getItem(path))    
    if(data == null){
        data = {history: [], seen: [], current: null}
    }
    data.seen = new Set(data.seen);
    return data;
}

function saveStorage(path,newstorage){
    newstorage.seen = [...newstorage.seen];
    storage.setItem(path,JSON.stringify(newstorage))
}

export function addToHistory(path, name){
    var data = getOrCreateStorage(path);
    console.log(Object.keys(data));
    if(data.history.at(-1) !== name){
        data.history.push(name);
        saveStorage(path,data);
    }
}

export function addToSeen(path, name){
    var data = getOrCreateStorage(path);
    data.seen.add(name);
    saveStorage(path,data);
}

export function getHistory(path){
    var data = getOrCreateStorage(path);
    return data.history;
}

export function getSeen(path){
    var data = getOrCreateStorage(path);
    return data.seen;
}

export function hasSeen(path, value){
    var data = getOrCreateStorage(path);
    return data.seen.has(value);
}

export function clearHistory(path){
    var data = getOrCreateStorage(path);
    data.history = [];
    saveStorage(path,data);
}


export function clearAll(path){
    storage.removeItem(path)
}

export function setCurrent(path,streamer){
    var data = getOrCreateStorage(path);
    data.current = streamer.name;
    saveStorage(path,data);
}

export function getCurrent(path, results){
    var data = getOrCreateStorage(path);
    results = results.filter(item => {return item.name === data.current})
    if (results.length === 1){return results.pop()}
    else {return null;}
}

export function clearCurrent(path,name){
    var data = getOrCreateStorage(path);
    data.current = null;
    saveStorage(path,data);
}

export function saveSeenPool(path,seen_pool){
    var data = getOrCreateStorage(path);
    const new_pool = new Set();
    if(seen_pool.length > 0){
        for(var item of seen_pool){new_pool.add(item.name)}
    }
    data.seen = new_pool
    saveStorage(path,data);
}


export function sortPools(path, all_items){
    var unseen_pool = [];
    var seen_pool = [];
    var data = getOrCreateStorage(path);
    for (var item of all_items) {
      if (data.seen.has(item.name)) {
        seen_pool.push(item)
      } else {
        unseen_pool.push(item)
      }
    }
    return {unseen_pool, seen_pool}
}
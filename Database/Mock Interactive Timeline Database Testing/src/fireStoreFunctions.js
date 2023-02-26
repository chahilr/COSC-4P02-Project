/*Firestore functions to change and read artifacts 
    By: Yannick De Caluwe
    Date: 2023-02-25
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc , setDoc, collection, query, getDoc, deleteDoc,
     where, getDocs, limit, orderBy, updateDoc, arrayUnion, addDoc, documentId, arrayRemove} from 'firebase/firestore';
import algoliasearch from 'algoliasearch';


//The Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAa8m8jdGb85y-Qzfm2TW1jv2R_-Qq6nCQ",
    authDomain: "cosc4p02-project-a5335.firebaseapp.com",
    projectId: "cosc4p02-project-a5335",
    storageBucket: "cosc4p02-project-a5335.appspot.com",
    messagingSenderId: "941095700018",
    appId: "1:941095700018:web:88000e3b139f089d9ede2b",
    measurementId: "G-W1X36PE2R1"
};

// Connect and authenticate with Algolia
const client = algoliasearch('GB2R7Y11QK', '004d4c4baa622b20321556edbae7d946');


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//getting firestore
const firestore=getFirestore(app);

/* CHEKCING FUNCTIONS */

async function checkRef(ref){
    let artifact=doc(firestore, "Artifacts/"+ref); 
    const docSnap = await getDoc(artifact);
    if (!docSnap.exists()){
        return false;
    }
    else{
        return true;
    }
}

/* FUNCTIONS: Adding and Mangaging data */

//Adding data to the data base
async function addArtifact(Exhibit, Name, Year, Photos, Videos, tags, ref, des){
    let artifacts = collection(firestore, 'Artifacts');

    for (let i=0; i<ref.lengh;i++){
        if(!checkRef(ref[i])){
            return "Related must exsit" 
        }
    }

    const docData = {
        Exhibition: Exhibit,
        Name: Name,
        Year: Year,
        Photos: Photos,
        Videos: Videos,
        Tags: tags,
        Related: ref
    };
    let newDoc = await addDoc(artifacts, docData);

    //add description to a sub collection called description
    let description = doc(firestore, 'Artifacts/' + newDoc.id + "/Description/1");
    await setDoc(description, {
        content: des
    });

    //add to algolia for searching
    const index = client.initIndex('dev_ArtifactName');
    const record = { objectID: newDoc.id, name: Name };
    await index.saveObject(record).wait();// adding await takes a couple secounds (waiting on algiol to update)
    return "Done";
}

//delete the artifact with the given artifact id
async function deleteArtifact(id){
    let artifact = doc(firestore, 'Artifacts/'+id);
    let description = doc(firestore, 'Artifacts/' + id + "/Description/1");

    await deleteDoc(artifact);
    await deleteDoc(description)

    //remove from algolia
    const index = client.initIndex('dev_ArtifactName');
    await index.deleteObject(id).wait();// adding await takes a couple secounds (waiting on algiol to update)
    return "Done";
}

//overwrite the given artifact's description
async function updateArtifactDescription(id, des){
    let description = doc(firestore, 'Artifacts/' + id + "/Description/1");
    await setDoc(description, {content: des},{merge: true});
    return "Done";
}

//overwrite the given artifact's exhibit
async function updateArtifactExhibit(id, Exhibit){
    let artifact = doc(firestore, 'Artifacts/'+id);
    const docData = {
        Exhibition: Exhibit
    };
    await setDoc(artifact, docData,{merge: true});
    return "Done";
}

//overwrite the given artifact's name
async function updateArtifactName(id, name){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await setDoc(artifact, {Name: name},{merge: true});

    //add to algolia for searching
    const index = client.initIndex('dev_ArtifactName');
    const record = { objectID: id, name: name };
    await index.saveObject(record).wait();// adding await takes a couple secounds (waiting on algiol to update)
    client.clearCache();
    return "Done";
}

//This method will change the year of the given artiact to the given year
async function updateArtifactYear(id, year){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await setDoc(artifact, {Year: year},{merge: true});
    return "Done";
}

//This method will add photos to the given artifact
async function addArtifactPhotos(id, photos){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await updateDoc(artifact, {
        Photos: arrayUnion(photos)
    });
    return "Done";
}

//This method will add photos to the given artifact
async function removeArtifactPhotos(id, photos){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await updateDoc(artifact, {
        Photos: arrayRemove(photos)
    });
    return "Done";
}

//This method will overwrite the photos of the given artifact
async function updateArtifactPhotos(id, photos){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await setDoc(artifact, {Photos: photos},{merge: true});
    return "Done";
}

//This method will add Videos to the given artifact
async function addArtifactVideos(id, Videos){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await updateDoc(artifact, {
        Videos: arrayUnion(Videos)
    });
    return "Done";
}

//This method will add photos to the given artifact
async function removeArtifactVideos(id, Videos){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await updateDoc(artifact, {
        Videos: arrayRemove(Videos)
    });
    return "Done";
}

//This method will overwrite the Videos of the given artifact
async function updateArtifactVideos(id, Videos){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await setDoc(artifact, {Videos: Videos},{merge: true});
    return "Done";
}

//This method will add Tags to the given artifact
async function addArtifactTags(id, Tags){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await updateDoc(artifact, {
        Tags: arrayUnion(Tags)
    });
    return "Done";
}

//This method will add tags to the given artifact
async function removeArtifactTags(id, Tags){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await updateDoc(artifact, {
        Tags: arrayRemove(Tags)
    });
    return "Done";
}

//This method will overwrite the Tags of the given artifact
async function updateArtifactTags(id, Tags){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await setDoc(artifact, {Tags: Tags},{merge: true});
    return "Done";
}

//This method will add the related artiacts id to the given artifact
async function removeRelated(id, ref){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await updateDoc(artifact, {
        Related: arrayRemove(ref)
    });
    return "Done";
}

//This method will overwrite the related artifacts of the given artifact
async function updateRelated(id, ref){
    for (let i=0; i<ref.lengh;i++){
        if(!checkRef(ref[i])){
            return "Related must exsit" 
        }
    }

    let artifact = doc(firestore, 'Artifacts/'+id);
    await setDoc(artifact, {Related: ref},{merge: true});
    return "Done";
}

//This method will add a relation to the given artifact
async function addRelated(id, ref){
    if(!checkRef(ref)){
        return "Related must exsit" 
    }
    let artifact = doc(firestore, 'Artifacts/'+id);
    await updateDoc(artifact, {
        Related: arrayUnion(ref)
    });
    return "Done";
}

//Adding data to the data base
async function addData(file){
    let x = await fetch(file);
    let y = await x.text();
    let json= JSON.parse(y);

    for (var key=0; key<50;key++){
        let artifacts = collection(firestore, 'Artifacts');
        let tags=[];
        let k=0;

        const index = client.initIndex('dev_ArtifactName')

        for (var tagKey in json[key].Tags){
            if(json[key].Tags[tagKey]!=""){
                tags[k]=json[key].Tags[tagKey];
                k++;
            }
        }
        //basic artifacts
        const docData = {
            Exhibition: json[key].Exhibition,
            Name: json[key].Name,
            Year: json[key].Year,
            Photos: json[key].Photos,
            Videos: json[key].Videos,
            Tags: tags,
            Related: []
        };
        let newDoc = await addDoc(artifacts, docData);

        //add description to a sub collection called description
        let description = collection(firestore, 'Artifacts/'+newDoc.id+"/Description");
        const data = {
            content: json[key].Description
        };
        addDoc(description, data);

        //add to algolia for searching
        const record = { objectID: newDoc.id, name: json[key].Name}
        index.saveObject(record).wait()
    }
    return "Done";
}

/* FUNCTIONS: Queries */


async function getDescrption(id){
    let artifact = doc(firestore, 'Artifacts/'+id+"/Description/1");
    const docSnap = await getDoc(artifact);
    return docSnap.data();
}

async function getArtifact(id){
    let artifact = doc(firestore, 'Artifacts/'+id);
    const docSnap = await getDoc(artifact);
    return docSnap.data();
}

async function queryExhibit(exhibit){
    let exhibitionQuery = query(
        collection(firestore, 'Artifacts'),
        where('Exhibition','in', exhibit)//not sure about this
    );
    let artifacts = await getDocs(exhibitionQuery);
    let result=[];
    artifacts.forEach((snap)=>{ 
        let temp=[snap.id,snap.data()]
        result.push(temp)
    });
    return result;
}

//name search query
async function queryName(name){
    //serach names
    const index = client.initIndex('dev_ArtifactName')
    let result=[];
    await index.search(name, {
        hitsPerPage: 10
        }).then(async function (responses) {
            let list = []
            responses.hits.forEach((json) => {
                list.push(json['objectID'])
            })
            if (list.length!=0){
                let nameQuery = query(
                    collection(firestore, 'Artifacts'),
                    where(documentId(), 'in', list)//not sure about this
                );
                let artifacts = await getDocs(nameQuery);
                artifacts.forEach((snap) => {
                    let temp=[snap.id,snap.data()]
                    result.push(temp)
                });
            }
        });
    return result;
}

//year range query
async function queryYearRange(exhibit, year1, year2){
    let artifacts
    if (year1<year2){
        let exhibitionQuery = query(
            collection(firestore, 'Artifacts'),
            where('Exhibition','in', exhibit),
            where('Year','<=',year2),
            where('Year','>=',year1),
            orderBy('Year')
        );
        artifacts = await getDocs(exhibitionQuery);
    }else if(year1==year2){
        let exhibitionQuery = query(
            collection(firestore, 'Artifacts'),
            where('Exhibition','in', exhibit),
            where('Year','=',year2),
            orderBy('Year')
        );
        artifacts = await getDocs(exhibitionQuery);
    }else{
        let exhibitionQuery = query(
            collection(firestore, 'Artifacts'),
            where('Exhibition','in', exhibit),
            where('Year','>=',year2),
            where('Year','<=',year1),
            orderBy('Year')
        );
        artifacts = await getDocs(exhibitionQuery);
    }
    let result=[];
    artifacts.forEach((snap)=>{ 
        let temp=[snap.id,snap.data()]
        result.push(temp)
    });
    return result;
}
//queryYearRange(['Indigenous History'], 1961, 1921);

//tag search query
async function queryTags(exhibit, tags){
    let idQuery1 = query(
        collection(firestore, 'Artifacts'),
        where('Exhibition','in', exhibit),
        orderBy('Year')
    );
    let idQuery2 = query(
        collection(firestore, 'Artifacts'),
        where('Tags','array-contains-any', tags),
        orderBy('Year')
    );
    let querySnapshot1 = await getDocs(idQuery1);
    let querySnapshot2 = await getDocs(idQuery2);

    let result=[];

    querySnapshot1.forEach((snap1)=>{ 
        querySnapshot2.forEach((snap2)=>{ 
            if(snap1.id==snap2.id){
                result.push(snap1)
            }
        });
    });
    let result2=[];
    result.forEach((snap)=>{ 
        let temp=[snap.id,snap.data()]
        result2.push(temp)
    });
    return result2;
}

//year1 <= year2
async function queryTagsExhibitsYearRange(exhibit, tags, year1, year2){
    let idQuery1 = query(
        collection(firestore, 'Artifacts'),
        where('Exhibition','in', exhibit),
        where('Year','>=',year1),
        where('Year','<=',year2),
        orderBy('Year')
    );
    let idQuery2 = query(
        collection(firestore, 'Artifacts'),
        where('Tags','array-contains-any', tags),
        where('Year','>=',year1),
        where('Year','<=',year2),
        orderBy('Year')
    );
    let querySnapshot1 = await getDocs(idQuery1);
    let querySnapshot2 = await getDocs(idQuery2);

    let result=[]

    querySnapshot1.forEach((snap1)=>{ 
        querySnapshot2.forEach((snap2)=>{ 
            if(snap1.id==snap2.id){
                result.push(snap1)
            }
        });
    });
    let result2=[];
    result.forEach((snap)=>{ 
        let temp=[snap.id,snap.data()]
        result2.push(temp)
    });
    return result2;
}

export {queryTagsExhibitsYearRange,queryTags,queryYearRange,queryName,queryExhibit,getDescrption,
    addArtifact,updateArtifactDescription,updateArtifactExhibit,updateArtifactName,updateArtifactYear,
    addArtifactPhotos,removeArtifactPhotos,updateArtifactPhotos,addArtifactVideos,removeArtifactVideos,
    updateArtifactVideos,addArtifactTags,removeArtifactTags,updateArtifactTags,addData, getArtifact, 
    deleteArtifact, removeRelated, addRelated, updateRelated
};

/*Old Firestore functions to read artifacts 
    By: Yannick De Caluwe
    Date: 2023-02-24
*/
//npx webpack --watch
//npx serve dist

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc , setDoc, onSnapshot, collection, query, getDoc,
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

// Connect and authenticate with your Algolia app
const client = algoliasearch('GB2R7Y11QK', '004d4c4baa622b20321556edbae7d946');

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//getting firestore
const firestore=getFirestore(app);



/* FUNCTIONS: Adding and Mangaging data */

//Adding data to the data base
async function addArtifact(Exhibit, Name, Year, Photos, Videos, tags, des){
    let artifacts = collection(firestore, 'Artifacts');

    //basic artifacts
    const docData = {
        Exhibition: Exhibit,
        Name: Name,
        Year: Year,
        Photos: Photos,
        Videos: Videos,
        Tags: tags
    };
    let newDoc = await addDoc(artifacts, docData);

    //add description to a sub collection called description
    let description = collection(firestore, 'Artifacts/' + newDoc.id + "/Description/1");
    const data = {
        content: des
    };
    await setDoc(description, data);

    //add to algolia for searching
    const index = client.initIndex('dev_ArtifactName')
    const record = { objectID: newDoc.id, name: Name }
    index.saveObject(record).wait()
}
//addArtifact("Indigenous History","Test", 1900, [], [], ["Furniture"], "This is the descritption")

async function updateArtifactDescription(id, des){
    let description = doc(firestore, 'Artifacts/' + id + "/Description/1");
    await setDoc(description, {content: des},{merge: true});
}
//updateArtifactDescription("dlrH1LoGgwc3ggAaMTJC", "This is a new descrpition")

async function updateArtifactExhibit(id, Exhibit){
    let artifact = doc(firestore, 'Artifacts/'+id);
    const docData = {
        Exhibition: Exhibit
    };
    await setDoc(artifact, docData,{merge: true});
}
//updateArtifactExhibit("dlrH1LoGgwc3ggAaMTJC", "War of 1812")

async function updateArtifactName(id, name){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await setDoc(artifact, {Name: name},{merge: true});

    //add to algolia for searching
    const index = client.initIndex('dev_ArtifactName')
    const record = { objectID: id, name: name }
    index.saveObject(record).wait()
}
//updateArtifactName("dlrH1LoGgwc3ggAaMTJC", "Tes")

async function updateArtifactYear(id, year){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await setDoc(artifact, {Year: year},{merge: true});
}
//updateArtifactYear("dlrH1LoGgwc3ggAaMTJC", 1911)

//This method will add photos to the given artifact
async function addArtifactPhotos(id, photos){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await updateDoc(artifact, {
        Photos: arrayUnion(photos)
    });
}
//addArtifactPhotos("dlrH1LoGgwc3ggAaMTJC", ["photo url 1"])

//This method will add photos to the given artifact
async function removeArtifactPhotos(id, photos){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await updateDoc(artifact, {
        Photos: arrayRemove(photos)
    });
}
//removeArtifactPhotos("dlrH1LoGgwc3ggAaMTJC", ["photo url 1"])

//This method will overwrite the photos of the given artifact
async function updateArtifactPhotos(id, photos){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await setDoc(artifact, {Photos: photos},{merge: true});
}
//updateArtifactPhotos("dlrH1LoGgwc3ggAaMTJC", ["photo url 1"])

//This method will add Videos to the given artifact
async function addArtifactVideos(id, Videos){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await updateDoc(artifact, {
        Videos: arrayUnion(Videos)
    });
}
//addArtifactVideos("dlrH1LoGgwc3ggAaMTJC", ["Video url 1"])

//This method will add photos to the given artifact
async function removeArtifactVideos(id, Videos){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await updateDoc(artifact, {
        Videos: arrayRemove(Videos)
    });
}
//removeArtifactVideos("dlrH1LoGgwc3ggAaMTJC", ["Video url 1"])

//This method will overwrite the Videos of the given artifact
async function updateArtifactVideos(id, Videos){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await setDoc(artifact, {Videos: Videos},{merge: true});
}
//updateArtifactVideos("dlrH1LoGgwc3ggAaMTJC", ["Video url 1"])

//This method will add Tags to the given artifact
async function addArtifactTags(id, Tags){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await updateDoc(artifact, {
        Tags: arrayUnion(Tags)
    });
}
//addArtifactTags("dlrH1LoGgwc3ggAaMTJC", ["Tag 1"])

//This method will add tags to the given artifact
async function removeArtifactTags(id, Tags){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await updateDoc(artifact, {
        Tags: arrayRemove(Tags)
    });
}
//removeArtifactTags("dlrH1LoGgwc3ggAaMTJC", ["Tag 1"])

//This method will overwrite the Tags of the given artifact
async function updateArtifactTags(id, Tags){
    let artifact = doc(firestore, 'Artifacts/'+id);
    await setDoc(artifact, {Tags: Tags},{merge: true});
}
//updateArtifactTags("dlrH1LoGgwc3ggAaMTJC", ["Tag 1"])


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
            Tags: tags
        };
        let newDoc = await addDoc(artifacts, docData);

        //add description to a sub collection called description
        let description = doc(firestore, 'Artifacts/'+newDoc.id+"/Description/1");
        const data = {
            content: json[key].Description
        };
        setDoc(description, data);

        //add to algolia for searching
        const record = { objectID: newDoc.id, name: json[key].Name}
        index.saveObject(record).wait()
    }
}
//addData("Data.json");



/* FUNCTIONS: Queries */


async function getDescrption(id){
    let artifact = doc(firestore, 'Artifacts/'+id+"/Description/1");
    const docSnap = await getDoc(artifact);
    console.log(docSnap.data())//data we want
}

async function queryExhibit(exhibit){
    let exhibitionQuery = query(
        collection(firestore, 'Artifacts'),
        where('Exhibition','in', exhibit)//not sure about this
    );
    let artifacts = await getDocs(exhibitionQuery);
    artifacts.forEach((snap)=>{ 
        console.log(snap.data())//data we want
        //getDescrption(snap.id)
    });
}
//queryExhibit(["Indigenous History"]);

//name search query
async function queryName(name){
    //serach names
    const index = client.initIndex('dev_ArtifactName')
    await index.search(name, {
        hitsPerPage: 10
        }).then(async function (responses) {
            let list = []
            responses.hits.forEach((json) => {
                list.push(json['objectID'])
            })
            let nameQuery = query(
                collection(firestore, 'Artifacts'),
                where(documentId(), 'in', list)//not sure about this
            );
            let artifacts = await getDocs(nameQuery);
            artifacts.forEach((snap) => {
                console.log(snap.data())//data we want
            });
        });
}
//queryName("strint");

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
    artifacts.forEach((snap)=>{ 
        console.log(snap.data())//data we want
    });
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

    let result=[]

    querySnapshot1.forEach((snap1)=>{ 
        querySnapshot2.forEach((snap2)=>{ 
            if(snap1.id==snap2.id){
                result.push(snap1)
            }
        });
    });
    result.forEach((snap)=>{ 
        console.log(snap.data())//data we want
    });
}
//queryTags(["War of 1812"],["Furniture"]);

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
    result.forEach((snap)=>{ 
        console.log(snap.data())//data we want
    });
}
//add artifact data to fire store (only run once since running it more will cuase dublicats since they are assigned a unique id)
//addData("Data.json");

async function testQueries(){
    console.log("Description Test:")
    await getDescrption("28a5McparsUxTeoRj8rN")
    console.log("Exhibit Test 1:")
    await queryExhibit(["War of 1812"])
    console.log("Exhibit Test 2:")
    await queryExhibit(["Indigenous History", "War of 1812"])
    console.log("Name Test 1:")
    await queryName("strint")
    console.log("Name Test 2:")
    await queryName("str")
    console.log("Year Range Test 1:")
    await queryYearRange(["Indigenous History", "War of 1812"],1750,1850)
    console.log("Tags Test 1:")
    await queryTags(["Indigenous History", "War of 1812"],["Furniture","Book"])
    console.log("Tags Test 2:")
    await queryTags(["Indigenous History", "War of 1812"],["Furniture"])

    console.log("Full fillter Test 1:")
    await queryTagsExhibitsYearRange(["Indigenous History"],["Furniture"],1750,1850)
    console.log("Full fillter Test 2:")
    await queryTagsExhibitsYearRange(["War of 1812"],["Furniture"],1750,1850)
    console.log("Full fillter Test 3:")
    await queryTagsExhibitsYearRange(["Indigenous History"],["Book"],1750,1850)
    console.log("Full fillter Test 4:")
    await queryTagsExhibitsYearRange(["Reminiscence"],["Furniture"],1700,1850)
}
testQueries()


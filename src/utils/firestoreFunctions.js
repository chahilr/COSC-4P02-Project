/*Firestore functions to change and read artifacts 
    By: Yannick De Caluwe
    Date: 2023-02-25
*/

// Import the functions you need from the SDKs you need
import {
  doc,
  setDoc,
  collection,
  query,
  getDoc,
  deleteDoc,
  where,
  getDocs,
  limit,
  orderBy,
  updateDoc,
  arrayUnion,
  addDoc,
  documentId,
  arrayRemove,
} from 'firebase/firestore';
import algoliasearch from 'algoliasearch';
import { firestore } from './FirebaseApp.js';

// Connect and authenticate with Algolia
const client = algoliasearch('GB2R7Y11QK', '004d4c4baa622b20321556edbae7d946');

/* CHEKCING FUNCTIONS */

async function checkRef(ref) {
  let artifact = doc(firestore, 'Artifacts/' + ref);
  const docSnap = await getDoc(artifact);
  if (!docSnap.exists()) {
    return false;
  } else {
    return true;
  }
}

/* FUNCTIONS: Adding and Mangaging data */

//Adding data to the data base
async function addArtifact(
  Exhibit,
  Name,
  Year,
  Photos,
  Videos,
  tags,
  ref,
  des
) {
  let artifacts = collection(firestore, 'Artifacts');

  for (let i = 0; i < ref.lengh; i++) {
    if (!checkRef(ref[i])) {
      return 'Related must exist';
    }
  }

  const docData = {
    Exhibition: Exhibit,
    Name: Name,
    Year: Year,
    Photos: Photos,
    Videos: Videos,
    Tags: tags,
    Related: ref,
  };
  let newDoc = await addDoc(artifacts, docData);

  //add description to a sub collection called description
  let description = doc(firestore, 'Artifacts/' + newDoc.id + '/Description/1');
  await setDoc(description, {
    content: des,
  });

  //add to algolia for searching
  const index = client.initIndex('dev_ArtifactName');
  const record = { objectID: newDoc.id, name: Name };
  index.saveObject(record).wait(); // adding await takes a couple secounds (waiting on algiol to update)
  return 'Done';
}

//delete the artifact with the given artifact id
async function deleteArtifact(id) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  let description = doc(firestore, 'Artifacts/' + id + '/Description/1');

  await deleteDoc(artifact);
  await deleteDoc(description);

  //remove from algolia
  const index = client.initIndex('dev_ArtifactName');
  index.deleteObject(id).wait(); // adding await takes a couple secounds (waiting on algiol to update)
  return 'Done';
}

//overwrite the given artifact's description
async function updateArtifactDescription(id, des) {
  let description = doc(firestore, 'Artifacts/' + id + '/Description/1');
  await setDoc(description, { content: des }, { merge: true });
  return 'Done';
}

//overwrite the given artifact's exhibit
async function updateArtifactExhibit(id, Exhibit) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  const docData = {
    Exhibition: Exhibit,
  };
  await setDoc(artifact, docData, { merge: true });
  return 'Done';
}

//overwrite the given artifact's name
async function updateArtifactName(id, name) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  await setDoc(artifact, { Name: name }, { merge: true });

  //add to algolia for searching
  const index = client.initIndex('dev_ArtifactName');
  const record = { objectID: id, name: name };
  index.saveObject(record).wait(); // adding await takes a couple secounds (waiting on algiol to update)
  client.clearCache();
  return 'Done';
}

//This method will change the year of the given artiact to the given year
async function updateArtifactYear(id, year) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  await setDoc(artifact, { Year: year }, { merge: true });
  return 'Done';
}

//This method will add photos to the given artifact
async function addArtifactPhotos(id, photos) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  await updateDoc(artifact, {
    Photos: arrayUnion(photos),
  });
  return 'Done';
}

//This method will add photos to the given artifact
async function removeArtifactPhotos(id, photos) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  await updateDoc(artifact, {
    Photos: arrayRemove(photos),
  });
  return 'Done';
}

//This method will overwrite the photos of the given artifact
async function updateArtifactPhotos(id, photos) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  await setDoc(artifact, { Photos: photos }, { merge: true });
  return 'Done';
}

//This method will add Videos to the given artifact
async function addArtifactVideos(id, Videos) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  await updateDoc(artifact, {
    Videos: arrayUnion(Videos),
  });
  return 'Done';
}

//This method will add photos to the given artifact
async function removeArtifactVideos(id, Videos) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  await updateDoc(artifact, {
    Videos: arrayRemove(Videos),
  });
  return 'Done';
}

//This method will overwrite the Videos of the given artifact
async function updateArtifactVideos(id, Videos) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  await setDoc(artifact, { Videos: Videos }, { merge: true });
  return 'Done';
}

//This method will add Tags to the given artifact
async function addArtifactTags(id, Tags) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  await updateDoc(artifact, {
    Tags: arrayUnion(Tags),
  });
  return 'Done';
}

//This method will add tags to the given artifact
async function removeArtifactTags(id, Tags) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  await updateDoc(artifact, {
    Tags: arrayRemove(Tags),
  });
  return 'Done';
}

//This method will overwrite the Tags of the given artifact
async function updateArtifactTags(id, Tags) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  await setDoc(artifact, { Tags: Tags }, { merge: true });
  return 'Done';
}

//This method will add the related artiacts id to the given artifact
async function removeRelated(id, ref) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  await updateDoc(artifact, {
    Related: arrayRemove(ref),
  });
  return 'Done';
}

//This method will overwrite the related artifacts of the given artifact
async function updateRelated(id, ref) {
  for (let i = 0; i < ref.lengh; i++) {
    if (!checkRef(ref[i])) {
      return 'Related must exsit';
    }
  }

  let artifact = doc(firestore, 'Artifacts/' + id);
  await setDoc(artifact, { Related: ref }, { merge: true });
  return 'Done';
}

//This method will add a relation to the given artifact
async function addRelated(id, ref) {
  if (!checkRef(ref)) {
    return 'Related must exsit';
  }
  let artifact = doc(firestore, 'Artifacts/' + id);
  await updateDoc(artifact, {
    Related: arrayUnion(ref),
  });
  return 'Done';
}

//Adding data to the data base
async function addData(file) {
  let x = await fetch(file);
  let y = await x.text();
  let json = JSON.parse(y);

  for (var key = 0; key < 50; key++) {
    let artifacts = collection(firestore, 'Artifacts');
    let tags = [];
    let k = 0;

    const index = client.initIndex('dev_ArtifactName');

    for (var tagKey in json[key].Tags) {
      if (json[key].Tags[tagKey] != '') {
        tags[k] = json[key].Tags[tagKey];
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
      Related: [],
    };
    let newDoc = await addDoc(artifacts, docData);

    //add description to a sub collection called description
    let description = collection(
      firestore,
      'Artifacts/' + newDoc.id + '/Description'
    );
    const data = {
      content: json[key].Description,
    };
    addDoc(description, data);

    //add to algolia for searching
    const record = { objectID: newDoc.id, name: json[key].Name };
    index.saveObject(record).wait();
  }
  return 'Done';
}

/* FUNCTIONS: Queries */

async function getDescrption(id) {
  let querySnapshot = await getDocs(
    collection(firestore, 'Artifacts/' + id + '/Description/')
  );

  let description = querySnapshot.docs[0].data();

  return description;
}

async function getArtifact(id) {
  let artifact = doc(firestore, 'Artifacts/' + id);
  const docSnap = await getDoc(artifact);
  return docSnap.data();
}

async function getAllArtifacts() {
  const colRef = collection(firestore, 'Artifacts');
  let tempArray = [];
  let i = 0;
  try {
    const docsSnap = await getDocs(colRef);
    docsSnap.forEach((doc) => {
      tempArray[i] = { ...doc.data(), id: doc.id };
      i++;
    });
  } catch (error) {
    console.log(error);
  }
  return tempArray;
}

async function queryExhibit(exhibit) {
  let exhibitionQuery = query(
    collection(firestore, 'Artifacts'),
    where('Exhibition', 'in', exhibit) //not sure about this
  );
  let artifacts = await getDocs(exhibitionQuery);
  let result = [];
  artifacts.forEach((snap) => {
    let temp = [snap.id, snap.data()];
    result.push(temp);
  });
  return result;
}

//name search query
async function queryName(name) {
  //serach names
  const index = client.initIndex('dev_ArtifactName');
  let result = [];
  await index
    .search(name, {
      hitsPerPage: 10,
    })
    .then(async function (responses) {
      let list = [];
      responses.hits.forEach((json) => {
        list.push(json['objectID']);
      });
      if (list.length != 0) {
        let nameQuery = query(
          collection(firestore, 'Artifacts'),
          where(documentId(), 'in', list) //not sure about this
        );
        let artifacts = await getDocs(nameQuery);
        artifacts.forEach((snap) => {
          let temp = [snap.id, snap.data()];
          result.push(temp);
        });
      }
    });
  return result;
}

//year range query
async function queryYearRange(exhibit, year1, year2) {
  let artifacts;
  if (year1 < year2) {
    let exhibitionQuery = query(
      collection(firestore, 'Artifacts'),
      where('Exhibition', 'in', exhibit),
      where('Year', '<=', year2),
      where('Year', '>=', year1),
      orderBy('Year')
    );
    artifacts = await getDocs(exhibitionQuery);
  } else if (year1 == year2) {
    let exhibitionQuery = query(
      collection(firestore, 'Artifacts'),
      where('Exhibition', 'in', exhibit),
      where('Year', '=', year2),
      orderBy('Year')
    );
    artifacts = await getDocs(exhibitionQuery);
  } else {
    let exhibitionQuery = query(
      collection(firestore, 'Artifacts'),
      where('Exhibition', 'in', exhibit),
      where('Year', '>=', year2),
      where('Year', '<=', year1),
      orderBy('Year')
    );
    artifacts = await getDocs(exhibitionQuery);
  }
  let result = [];
  artifacts.forEach((snap) => {
    let temp = [snap.id, snap.data()];
    result.push(temp);
  });
  return result;
}
//queryYearRange(['Indigenous History'], 1961, 1921);

//tag search query
async function queryTags(exhibit, tags) {
  let idQuery1 = query(
    collection(firestore, 'Artifacts'),
    where('Exhibition', 'in', exhibit),
    orderBy('Year')
  );
  let idQuery2 = query(
    collection(firestore, 'Artifacts'),
    where('Tags', 'array-contains-any', tags),
    orderBy('Year')
  );
  let querySnapshot1 = await getDocs(idQuery1);
  let querySnapshot2 = await getDocs(idQuery2);

  let result = [];

  querySnapshot1.forEach((snap1) => {
    querySnapshot2.forEach((snap2) => {
      if (snap1.id == snap2.id) {
        result.push(snap1);
      }
    });
  });
  let result2 = [];
  result.forEach((snap) => {
    let temp = [snap.id, snap.data()];
    result2.push(temp);
  });
  return result2;
}

//year1 <= year2
async function queryTagsExhibitsYearRange(exhibit, tags, year1, year2) {
  let idQuery1 = query(
    collection(firestore, 'Artifacts'),
    where('Exhibition', 'in', exhibit),
    where('Year', '>=', year1),
    where('Year', '<=', year2),
    orderBy('Year')
  );
  let idQuery2 = query(
    collection(firestore, 'Artifacts'),
    where('Tags', 'array-contains-any', tags),
    where('Year', '>=', year1),
    where('Year', '<=', year2),
    orderBy('Year')
  );
  let querySnapshot1 = await getDocs(idQuery1);
  let querySnapshot2 = await getDocs(idQuery2);

  let result = [];

  querySnapshot1.forEach((snap1) => {
    querySnapshot2.forEach((snap2) => {
      if (snap1.id == snap2.id) {
        result.push(snap1);
      }
    });
  });
  let result2 = [];
  result.forEach((snap) => {
    let temp = [snap.id, snap.data()];
    result2.push(temp);
  });
  return result2;
}

/* FUNCTIONS: User Queries */

async function getUserEmails() {
  let q = query(collection(firestore, 'Users'));
  let querySnapshot = await getDocs(q);

  let result = [];

  querySnapshot.forEach((snap) => {
    result.push(snap.data().Email);
  });
  return result;
}

async function getUserData(uid) {
  let artifact = doc(firestore, 'Users/' + uid);

  let querySnapshot = await getDoc(artifact);

  return querySnapshot.data();
}

async function getUsersPassword(email) {
  let q = query(collection(firestore, 'Users'), where('Email', '==', email));
  let querySnapshot = await getDocs(q);
  let result = [];
  querySnapshot.forEach((snap) => {
    result.push(snap.data());
  });
  return result[0].Password;
}

async function getUserRole(email) {
  let q = query(collection(firestore, 'Users'), where('Email', '==', email));
  let querySnapshot = await getDocs(q);

  return querySnapshot.data().Role;
}

async function mainAdmin(uid) {
  let artifact = doc(firestore, 'Users/' + uid);

  let querySnapshot = await getDoc(artifact);

  if (querySnapshot.data().Role == 'mainAdmin') {
    return true;
  }
  return false;
}

async function updateE(uid, newEmail) {
  let artifact = doc(firestore, 'Users/' + uid);
  await setDoc(artifact, { Email: newEmail }, { merge: true });
}

async function updateP(uid, newPass) {
  let artifact = doc(firestore, 'Users/' + uid);
  await setDoc(artifact, { Password: newPass }, { merge: true });
}

async function removeU(uid) {
  let artifact = doc(firestore, 'Users/' + uid);
  await deleteDoc(artifact);
}

async function addAdmin(uid, email, password, role) {
  let description = doc(firestore, 'Users/' + uid);
  await setDoc(description, {
    Email: email,
    Password: password,
    Role: role,
  });
}

export {
  queryTagsExhibitsYearRange,
  queryTags,
  queryYearRange,
  queryName,
  queryExhibit,
  getDescrption,
  addArtifact,
  updateArtifactDescription,
  updateArtifactExhibit,
  updateArtifactName,
  updateArtifactYear,
  addArtifactPhotos,
  removeArtifactPhotos,
  updateArtifactPhotos,
  addArtifactVideos,
  removeArtifactVideos,
  updateArtifactVideos,
  addArtifactTags,
  removeArtifactTags,
  updateArtifactTags,
  addData,
  getArtifact,
  getAllArtifacts,
  deleteArtifact,
  removeRelated,
  addRelated,
  updateRelated,
  getUserEmails,
  getUserData,
  getUsersPassword,
  getUserRole,
  mainAdmin,
  updateE,
  updateP,
  removeU,
  addAdmin,
};

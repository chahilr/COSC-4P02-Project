/*Firestore functions testing to make sure they work corrrectly
    By: Yannick De Caluwe
    Date: 2023-02-25
*/
//npx webpack --watch
//npx serve dist

import {queryTagsExhibitsYearRange,queryTags,queryYearRange,queryName,queryExhibit,getDescrption,
    addArtifact,updateArtifactDescription,updateArtifactExhibit,updateArtifactName,updateArtifactYear,
    addArtifactPhotos,removeArtifactPhotos,updateArtifactPhotos,addArtifactVideos,removeArtifactVideos,
    updateArtifactVideos,addArtifactTags,removeArtifactTags,updateArtifactTags,addData, getArtifact, deleteArtifact,
    removeRelated, addRelated, updateRelated} from './fireStoreFunctions.js'


/* EXAMPLE CALLS */

//Using async functions
async function testFirestoreCalls(){
    console.log("addArtifact test:");
    await addArtifact("War of 1812", "Left over couch", 1812, ["http://dummyimage.com/166x141.png/5fa2dd/ffffff"],
    ["https://firebasestorage.googleapis.com/v0/b/cosc4p02-project-a5335.appspot.com/o/sample_video.mp4%20(240p).mp4?alt=media&token=0687e508-8936-4547-b707-e858b9bb0ddd"],
     ["Furniture"], [], "This couch was damaged and left over after the war used by the military");
    let data=await queryName("Left over couch");
    console.log(data);
    let id=data[0][0];//array should contain 1 element which has id in the first element
    data=await getDescrption(id);
    console.log(data);

    console.log("updateArtifactDescription test:");
    await updateArtifactDescription(id, "This is a new description for the couch");
    data=await getDescrption(id);
    console.log(data.content);

    console.log("updateArtifactExhibit test:");
    await updateArtifactExhibit(id, "Reminiscence");
    data=await getArtifact(id);
    console.log(data.Exhibition);

    console.log("updateArtifactName test 1:");
    await updateArtifactName(id, "This is a Test");
    data=await queryName("Left over couch");
    console.log(data);
    console.log("updateArtifactName test 2:");
    data=await queryName("This is a Test");
    console.log(data);

    console.log("updateArtifactYear test:");
    await updateArtifactYear(id, 1900);
    data=await getArtifact(id);
    console.log(data.Year);

    //Photos
    console.log("addArtifactPhotos test:");
    await addArtifactPhotos(id, "new photo url");
    data=await getArtifact(id);
    console.log(data.Photos);

    console.log("removeArtifactPhotos test:");
    await removeArtifactPhotos(id, "new photo url");
    data=await getArtifact(id);
    console.log(data.Photos);

    console.log("updateArtifactPhotos test:");
    await updateArtifactPhotos(id, ["http://dummyimage.com/111x111.png/dddddd/000000","http://dummyimage.com/246x190.png/dddddd/000000"]);
    data=await getArtifact(id);
    console.log(data.Photos);

    //Videos
    console.log("addArtifactVideos test:");
    await addArtifactVideos(id, "new video url");
    data=await getArtifact(id);
    console.log(data.Videos);

    console.log("removeArtifactVideos test:");
    await removeArtifactVideos(id, "new video url");
    data=await getArtifact(id);
    console.log(data.Videos);

    console.log("updateArtifactVideos test:");
    await updateArtifactVideos(id, ["vidoes url 1","video url 2"]);
    data=await getArtifact(id);
    console.log(data.Videos);

    //Tags
    console.log("addArtifactTags test:");
    await addArtifactTags(id, "Map");
    data=await getArtifact(id);
    console.log(data.Tags);

    console.log("removeArtifactTags test:");
    await removeArtifactTags(id, "Map");
    data=await getArtifact(id);
    console.log(data.Tags);

    console.log("updateArtifactTags test:");
    await updateArtifactTags(id, ["Letter","Book"]);
    data=await queryTagsExhibitsYearRange(["Reminiscence"],["Letter"],1900,1900);
    console.log(data[0][1].Tags);

    //Related
    console.log("addRelated test:");
    await addRelated(id, "08C1DHn7Wp6kD0v87HFo");
    data=await getArtifact(id);
    console.log(data.Related);

    console.log("removeRelated test:");
    await removeRelated(id, "08C1DHn7Wp6kD0v87HFo");
    data=await getArtifact(id);
    console.log(data.Related);

    console.log("updateRelated test:");
    await updateRelated(id, ["0sRSLqi8xKsmOqV5VAzT","13GWFfBjZNaNbtq7zJGA"]);
    data=await getArtifact(id);
    console.log(data.Related);

    //Delete
    console.log("deleteArtifact test:");
    await deleteArtifact(id);
    data=await getArtifact(id);
    console.log(data);
}
testFirestoreCalls()

//Using then method
//let data=queryExhibit(["Indigenous History"]);
//data.then(function(value){console.log(value)});

/* CALLS */



//addData("Data.json");
//queryExhibit(["Indigenous History"]);
//queryName("strint");
//queryTagsExhibitsYearRange(['War of 1812'],['Furniture'], 1961, 1921);



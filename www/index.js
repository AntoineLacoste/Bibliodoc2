(function () {

    "use strict";
    document.addEventListener("DOMContentLoaded", function(event) {
        console.log("" + navigator.userAgent);
        if (navigator.userAgent.match(/iPad|iPhone|IEMobile|Android/)) {
            document.addEventListener("deviceready", onReady, false);
        }
        else {
            onReady();
        }
    });

        function onReady() {
            // Handle the deviceready event.
            testIDB();
        }

    })();


function testIDB(){

                //// Suppression BDD
                //DeleteDatabase("Test");
                //// Création structure BDD
                //CreateIdbBibliodoc();
                //// Insertion jeu de test
                //InsertDataTest();
                testID();
}

function testID(){
    //shimIndexedDB.__useShim();
    DeleteDatabase("idarticle_people");

    //var aStruct = {
    //    'people': [['name', false], ['email', false], ['created', false]]
    //}
    //CreateDatabase("idarticle_people",aStruct);

    var IDB = window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB ||
        window.shimIndexedDB;

    var openRequest = IDB.open("idarticle_people",2);

    openRequest.onupgradeneeded = function(e) {

        var thisDB = e.currentTarget.result;

        thisDB.createObjectStore("people",{autoIncrement:true});

        console.log("people créé");
    }

    openRequest.onsuccess = function(e) {


        console.log("running onsuccess");

        db = e.target.result;

        //Listen for add clicks
        document.getElementById("addButton").addEventListener("click", addPerson, false);
    }
    openRequest.onblocked = function (e) { console.log('blocked BDD'); }

    openRequest.onerror = function(e) {console.log("error");}
}


function addPerson(e) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
 
    console.log("About to add "+name+"/"+email);
    //Define a person
    var person = {
        name:name,
        email:email,
        created:new Date()
    }
 
    //Perform the add
    InsertData("idarticle_people","people",[person]);
    var a=document.createElement("p");
    var b=document.createTextNode('ajout effectué');
    a.appendChild(b);
    document.getElementById("anduin").appendChild(a);

                        
    }


function InsertDataTest() {
    InsertData("Test", 'utilisateur', [{ "nom": "ELIPCE", "prenom": "Informatique", "date_naissance": "2014-07-23", "mail": "yann.plantevin@elipce.com", "login": "elipce", "pwd": "7e54dad3d4b787512e80e6058a01ccecfef6b188", "first_conn": "0", "societe_id": 1 },
                                                { "nom": "PEREZ", "prenom": "Vivian", "date_naissance": "1985-02-26", "mail": "vivian.perez@elipce.com", "login": "viv", "pwd": "", "societe_id": 1, "item1": "a", "item2": "b" }]);

    InsertData("Test", 'societe', [{ "id": 1, "libelle": "EPS", "adresse": "", "adresse2": "", "code_postal": "", "ville": "", "tel": "" }, { "id": 2, "libelle": "APR", "adresse": "", "adresse2": "", "code_postal": "", "ville": "", "tel": "" }]);
    InsertData("Test", 'marque_societe', [{ "id": 2, "marque_id": 2, "societe_id": 1 },
                                                    { "id": 1, "marque_id": 1, "societe_id": 2 }]);
    InsertData("Test", 'marque', [{ "id": 1, "nom": "Promotions APR", "dossier_id": 1, "is_promo": 1 },
                                            { "id": 2, "nom": "Promotions EPS", "dossier_id": 2, "is_promo": 1 }
    ]);
    InsertData("Test", 'dossier', [{ "id": 1, "nom": "Promotions APR", "dossier_id": null },
                                            { "id": 2, "nom": "Promotions EPS", "dossier_id": null }
    ]);
    InsertData("Test", 'document', [{ "id": 1, "nom": "Armani code", "dossier_id": 4, 'chemin_fichier': '1.pdf' },
                                          { "id": 2, "nom": "Aqua di gio", "dossier_id": 4, 'chemin_fichier': '2.docx' }
    ]);

}

function CreateIdbBibliodoc() {
    /// <summary>
    /// Création de la structure de la BDD bibliodoc-mobile
    /// </summary>

    // Structure BDD
    var aStruct = {
        'utilisateur': [['nom', false], ['prenom', false], ['date_naissance', false], ['mail', false], ['login', false],  ['societe_id', false]],
        'societe': [['libelle', false]],
        'marque_societe': [['marque_id', false], ['societe_id', false]],
        'marque': [['nom', false], ['dossier_id', false], ['is_promo', false]],
        'dossier': [['nom', false], ['dossier_id', false]],
        'document': [['nom', false], ['description', false], ['dossier_id', false]]
    }
    // Création BDD si elle n'existe pas.
    CreateDatabase("Test", aStruct);

}
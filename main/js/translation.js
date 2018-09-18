const languages = ["fr", "en"];

const translations = {
    "pretitle": {
        fr: "La véritable histoire de",
        en: "The true story of",
    },
    "advisory": {
        fr: "(déconseillé aux moins de 18 ans)",
        en: "(not recommended under 18)",
    },
    "advisory-already": {
        fr: "(déjà déconseillé aux moins de 18 ans)",
        en: "(already not recommended under 18)",
    },
    "notoutyet": {
        fr: "Pas encore sorti",
        en: "Not out yet",
    },
    "launch": {
        fr: "Jouer sur navigateur",
        en: "Play on browser",
    },
    "dl": {
        fr: "Télécharger le jeu",
        en: "Download the game",
    },
    // Jean Plank I - The Story
    "jp1-summary": {
        fr: "Jean Plank fait une escale pour se ravitailler.",
        en: "Jean Plank makes a stop to refuel.",
    },
    "jp1-title": {
        fr: "The Story",
        en: "The Story",
    },
    // Jean Plank II - Naissance des Flammes de la Vengeance
    "jp2-summary": {
        fr: "Les aventures de Jean Plank et de son Luchien.<br>Jean Plank retrouve de vieilles connaissances : Urgo et Saint Gède.",
        en: "The adventures of Jean Plank and his Luchien.<br>Jean Plank meets old friends of him: Urgo and Saint Gède.",
    },
    "jp2-title": {
        fr: "Naissance des Flammes de la Vengeance",
        en: "Birth of the Flames of Vengeance",
    },
    // Jean Plank III - Le Vrai Visage de la Vengeance
    "jp3-summary": {
        fr: "<i>Suite de la première fin de Jean Plank II</i><br><br>Jean-Plank, déformé par Saint Gède, part en quête de son visage.",
        en: "<i>Sequel to the first ending of Jean Plank II</i><br><br>Jean-Plank, deformed by Saint Gède, seeks his lost face.",
    },
    "jp3-title": {
        fr: "Le Vrai Visage de la Vengeance",
        en: "The True Face of Vengeance",
    },
    // Jean Plank III - Valhalla Ouakbar
    "jp3b-summary": {
        fr: "<i>Suite de la deuxième fin de Jean Plank II</i>",
        en: "<i>Sequel to the first ending of Jean Plank II</i>",
    },
    "jp3b-title": {
        fr: "Valhalla Ouakbar",
        en: "Valhalla Ouakbar",
    },
    // Jean Plank IV - Tout le Monde doit Payer
    "jp4-summary": {
        fr: "",
        en: "",
    },
    "jp4-title": {
        fr: "Tout le Monde doit Payer",
        en: "Everyone Pays",
    },
};

const $btns = $("#lang-btns");


function init() {
    for (let i = 0; i < languages.length; i++) {
        $btns.append($("<button>")
            .attr("id", "btn-"+languages[i])
            .text(languages[i])
            .click(languages[i], (e) => changeLanguage(e.data)));
    }

    const lang = (navigator.language || navigator.userLanguage).split('-')[0];
    if (languages.indexOf(lang) !== -1) {
        changeLanguage(lang);
    } else {
        changeLanguage("en");
    }

}


function changeLanguage(lang) {
    $("[text]").each((_, elt) => {
        const $elt = $(elt);
        $elt.html(translations[$elt.attr("text")][lang]);
        $btns.children().removeClass("active");
        $("#btn-"+lang).addClass("active");
    });
}


init();

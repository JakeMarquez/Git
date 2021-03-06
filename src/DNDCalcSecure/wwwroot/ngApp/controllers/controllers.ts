namespace DNDCalcSecure.Controllers {

    export class HomeController {
        public message;
        public dndResource;
        public abilityTitles = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
        public parseAbilityScores(num, index) {
            var scores = this.dndService.parseAbilityScores(num);
            return scores[index];
        }

        public getRandNumb(max, min) {
            return Math.floor((Math.random() * (max - min) + min));
        }

        constructor(public dndService: DNDCalcSecure.Services.DndService, accountService: DNDCalcSecure.Services.AccountService) {
            this.dndResource = dndService.characterResource;
            this.message = dndService.getQuote(this.getRandNumb(0, 4));
            if (this.message.text.length > 50) {
                document.getElementById("adventureQuote").setAttribute("style", "font-size: 2vw;");
            };
            if (this.message.text.length > 85) {
                document.getElementById("adventureQuote").setAttribute("style", "font-size: 1.5vw;");
            };
        }
    }


    export class SecretController {
        public secrets;
        public abilityTitles = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
        public parseAbilityScores(num, index) {
            var scores = this.dndService.parseAbilityScores(num);
            return scores[index];
        }

        public parseIbf(string) {
            var ibf = this.dndService.parseIbf(string);
            return ibf;
        }
        public simplesave(newChar) {
            console.log(newChar);
            this.dndService.save(newChar).then(() => {
                return newChar;
            });  
        }

        constructor(public dndService: DNDCalcSecure.Services.DndService, accountService: DNDCalcSecure.Services.AccountService) {
            dndService.getUserCharacters().then((result) => { this.secrets = result.data;});
            console.log(this.secrets);
        }
        public isactive = true;
        public savefunction(item) {
            this.isactive = true;

        }
        
    }

    export class DungeonController {

        constructor(public dmService: DNDCalcSecure.Services.DmService) {
            //window.onbeforeunload = function () {
            //    alert("are you sure you want to leave?"); 
            //    return false;
            //}
        }

        public hpGenerator(num) {
            var roll = function(min, max){
            return Math.round((Math.random() * (max - min) + min));
            }
            var total = this.IntervalId;
            for (var x = 0; x < num; x++) {
                total += roll(1, 6);
            }
            return total;
        }
        

        public Interval = 0;
        public IntervalId = 5;
        public idGenerator() {
            this.Interval += this.IntervalId;
            return this.Interval;
        }

        public newCreatureName;
        public selectedCreature = {
            body: "",
            head: ""
        };

        public pullCreature(name) {
            return this.dmService.pull(name.toString());
        }

        public creatures = [
        ];

        public addCreature(hitDie, type) {
            if (this.checkName(this.newCreatureName) == true) {
                return;
            }
            else {
                var creature = {
                    id: this.idGenerator,
                    name: this.newCreatureName,
                    hp: this.hpGenerator(hitDie),
                    type: type,
                    statblock: this.pullCreature(type)
                }
                this.creatures.push(creature)
            }
        }

        public checkName(instance) {
            for (var x = 0; x < this.creatures.length; x++) {
                if (instance == this.creatures[x].name) {
                    return true;
                }
            }
            return false;
        }

    }

    export class AboutController {
        public message = 'Hello from the about page!';
    }
    export class CreationController {
        public modalInstance;
        public Quote = {};
        public class;
        public race;
        public background;
        subrace2 = [];
        subraceTitles: string[];
        public selectedSubrace;
        public tooltip = { open: false, message: "" };
        public scrollListener;
        public formComplete;
        public validationMessages;
        public subRequired = true;

        constructor(public dndService: DNDCalcSecure.Services.DndService,
            private $uibModal: angular.ui.bootstrap.IModalService,
            private $scope: angular.IScope,
            private $state: angular.ui.IStateService) {
            this.subraceTitles = ["+1 Wiz", "+2 Str", "+1 Str", "+1 Wiz", "+1 Int", "+1 Dex", "+1 Dex", "+1 Cha", "+1 Con"];
            this.subrace2.push({ race: "Hill Dwarf", title: "+1 Wiz" }, { race: "Mountain Dwarf", title: "+2 Str" }, { race: "Gray Dwarf", title: "+1 Str" }, { race: "Wood Elf", title: "+1 Wiz" }, { race: "High Elf", title: "+1 Int" }, { race: "Deep Gnome", title: "+1 Dex" }, { race: "Forest Gnome", title: "+1 Dex" }, { race: "Lightfoot Halfling", title: "+1 Cha" }, { race: "Stout Halfling", title: "+1 Con" });
            let rand = this.getRandNumb(0, 4);
            this.Quote = dndService.getQuote(rand);
            if (this.dndService.newUser()) { this.tooltip.open = true; this.tooltip.message = "Click Me!" };
            this.scrollListener = window.addEventListener("scroll", this.scrollEvent, false);
            this.scrollEvent();
        };


        public scrollEvent() {
            if ((window.scrollY % 2) == 1) { return; };
            if (window.scrollY > 800) {
                //animation
                document.getElementById("bumpUpLink").setAttribute("class", "panel panel-default bumpUpLink affix fadeIn");
                document.getElementById("bumpUpLink").setAttribute("style", "");
                    //buttons being enabled
                    var buttons = document.getElementsByClassName("vnbButton");
                    for (var x = 0; x < buttons.length; x++) {
                        buttons[x].removeAttribute("disabled");
                    }
            };
            if (window.scrollY < 800) {
                //animation
                document.getElementById("bumpUpLink").setAttribute("class", "panel panel-default bumpUpLink affix fadeOut");
                document.getElementById("bumpUpLink").setAttribute("style", "opacity: 0;");
                    //buttons being disabled
                    var buttons = document.getElementsByClassName("vnbButton");
                    for (var x = 0; x < buttons.length; x++) {
                        buttons[x].setAttribute("disabled","disabled")
                    }
            };
        }


        public getRandNumb(max, min) {
            return Math.floor((Math.random() * (max - min) + min));
        }
        public jumpTo(link) {
            var select = document.getElementById(link);
            select.scrollIntoView();
            this.scrollEvent();
        }
        
        public resetSubrace() {
            this.selectedSubrace = "";
            if (this.race != "Elf" && this.race != "Dwarf" && this.race != "Halfling" && this.race != "Gnome") {
                this.subRequired = false;
                return;
            }
                this.subRequired = true;
        }

        public savedata() {
            sessionStorage.setItem("char", this.class + "," + this.race + "," + this.selectedSubrace + "," + this.background);
            window.removeEventListener("scroll", this.scrollEvent, false);
            this.$state.go('save');
        }

        public showModal() {
            this.modalInstance = this.$uibModal.open({
                templateUrl: 'ngApp/views/modals/instructionsModal.html',
                scope: this.$scope,
                animation: true,
                size: 'md'
            });
        }
        public close() {
            this.modalInstance.close();
        }
    }

    export class SaveController {
        public validationMessages;
        public pending = false;
        public createdCharacter; // class, race, subrace, background
        public characterName;
        public characterProficiencies;
        public title;
        public class;
        public subrace;
        public subraceabilities;
        public background;
        public STR = "";
        public DEX = "";
        public CON = "";
        public WIS = "";
        public INT = "";
        public CHA = "";
        public subracialMods = [];
        public classProficiencies = [];
        public additionalProficiencies = [];
        public abilityModifierReference = [];
        public modalInstance;
        public tooltip = { open: false, message: "" };

        //ABILITY SCORE GENERATOR
        public getRandNumb(max, min) {
            return Math.floor((Math.random() * (max - min) + min));
        }
        public trait1 = this.getRandNumb(5, 18);
        public trait2 = this.getRandNumb(5, 18);
        public trait3 = this.getRandNumb(5, 18);
        public trait4 = this.getRandNumb(5, 18);
        public trait5 = this.getRandNumb(5, 18);
        public trait6 = this.getRandNumb(5, 18);

        public abMods = ["","","","","",""];

        public traitswap = { 'clicked': false, 'trait': "" };
        public traitswap2 = { 'clicked': false, 'trait': "" };

        public firstclick(trait) {
            if (this.traitswap.clicked == true) {
                this.traitswap2.clicked = true;
                this.traitswap2.trait = trait;
                var cList = document.getElementById("td_" + this.traitswap.trait).classList.toString().replace(" preSwapTableData","");
                var clicked = document.getElementById("td_" + this.traitswap.trait).setAttribute("class", cList);
                this.swapmethod();
                return this.traitswap2;
            }
            this.traitswap.clicked = true;
            this.traitswap.trait = trait;
            var classList = document.getElementById("td_" + trait).classList.toString();
            var clicked = document.getElementById("td_" + trait).setAttribute("class", classList + " preSwapTableData");
        }

        public swapmethod() {
            var swapped = document.getElementById(this.traitswap2.trait).innerText;
            document.getElementById(this.traitswap2.trait).innerText = document.getElementById(this.traitswap.trait).innerText;
            document.getElementById(this.traitswap.trait).innerText = swapped;
            this.traitswap.clicked = false; this.traitswap.trait = "";
            this.traitswap2.clicked = false; this.traitswap2.trait = "";
            this.abScoreUpdate();
        }

        public abScoreUpdate() {
            this.trait1 = parseInt(document.getElementById("trait1").innerHTML);
            this.trait2 = parseInt(document.getElementById("trait2").innerHTML);
            this.trait3 = parseInt(document.getElementById("trait3").innerHTML);
            this.trait4 = parseInt(document.getElementById("trait4").innerHTML);
            this.trait5 = parseInt(document.getElementById("trait5").innerHTML);
            this.trait6 = parseInt(document.getElementById("trait6").innerHTML);
            this.abModifierUpdate();
        }

        public abModifierUpdate() {
            let abArray = [this.STR, this.DEX, this.CON, this.INT, this.WIS, this.CHA];
            let abArray2 = [this.trait1, this.trait2, this.trait3, this.trait4, this.trait5, this.trait6];
            for (var x = 0; x < 6; x++) {
                var sum = parseInt(abArray[x]) + abArray2[x];
                if (abArray[x] == "") { sum = abArray2[x] }
                if (sum > 9){
                    this.abMods[x] = "+" + this.abilityModifierReference[sum].toString();
                };
                if (sum <= 9) {
                    this.abMods[x] = "-" + this.abilityModifierReference[sum].toString();
                }
                var title = "abMod" + x.toString();
                document.getElementById(title).innerHTML = this.abMods[x];
            }
        }

        //ABILITY SCORE GENERATOR

        //Primary abilities for class method
        public primaryAbilities(className) {
            var p = {
                "Barbarian": "Strength and Dexterity",
                "Bard": "Dexterity and Charisma",
                "Cleric": "Wisdom and Charisma",
                "Druid": "Intelligence and Wisdom",
                "Fighter": "Strength and Dexterity",
                "Monk": "Strength and Dexterity",
                "Ranger": "Dexterity and Strength",
                "Rogue": "Dexterity and Intelligence",
                "Paladin": "Strength and Charisma",
                "Sorcerer": "Constitution and Charisma",
                "Warlock": "Wisdom and Charisma",
                "Wizard": "Intelligence and Wisdom"
            };
            return p[className];
        }

        // COMPILE AND SAVE TO DATABASE METHOD
        bonusCheck(mod) {
            if (parseInt(mod)) {
                return parseInt(mod);
            }
            else {
                return 0;
            }
        }
        speedCheck(race) {
            if (race == "Elf" || race == "Half Elf" || race == "Human" || race == "Dragonborn" || race == "Half Orc" || race == "Tiefling") {
                return "30 feet";
            }
            else {
                return "25 feet";
            }
        }



        public checkBoxValue;
        generateIdealsBondsFlaws() {
            var rand1 = this.getRandNumb(0,4);
            var rand2 = this.getRandNumb(0, 4);
            var rand3 = this.getRandNumb(0, 4);
            var idealBank = ["I am a free spirit, no one can command me.","We must lay down our lives to protect others.","Meddling in the affairs of others only brings trouble.","Blood runs thicker than water."];
            var bondBank = ["It is my duty to provide children to carry on my tribes legacy.", "I persue wealth to secure someones love.", "I protect those who cannot protect themselves.","I will do anything to prove myself superior to my rival."];
            var flawBank = ["I cant reseist a pretty face.", "I have trouble trusting my allies.", "Ill do anything to get my hands on something rare or priceless.", "I secretly believe everyone is beneath me."];
            var ideal = idealBank[rand1];
            var bond = bondBank[rand2];
            var flaw = flawBank[rand3];
            return ideal + " " + bond + " " + flaw;
        }
        public magicCheck(charclass){
            if (charclass == 'Sorcerer' || charclass == 'Wizard' || charclass == 'Bard' || charclass == 'Cleric' || charclass == 'Druid') {
                return '2';
            }
            if (charclass == 'Warlock') {
                return '1';
            }
            else {
                return '0';
            }
        };

        public proficiencyScrape(objName, keyType, key) {
            for (var x = 0; x < objName.length; x++) {
                if (objName[x][keyType] == key) {
                    return objName[x].Proficiencies;
                }
            }
        };

        public save() {
            this.pending = true;
            console.log(this.checkBoxValue);
            var str = this.bonusCheck(this.STR);
            var dex = this.bonusCheck(this.DEX)
            var con = this.bonusCheck(this.CON);
            var wis = this.bonusCheck(this.WIS);
            var int = this.bonusCheck(this.INT);
            var cha = this.bonusCheck(this.CHA);
            var IdealsBondsFlaws;
            if (this.checkBoxValue = true) {
                IdealsBondsFlaws = this.generateIdealsBondsFlaws();
            }
            else {
                IdealsBondsFlaws = " ";
            }
            var newChar = {
                'Name': this.characterName,
                'Author': this.accountService.getUserName(),
                'AbilityScores': (this.trait1 + str).toString() + (this.trait2 + dex).toString() + (this.trait3 + con).toString() + (this.trait4 + wis).toString() + (this.trait5 + int).toString() + (this.trait6 + cha).toString(),
                'Class': this.class,
                'Race': this.createdCharacter[1],
                'Subrace': this.title,
                'Background': this.background,
                'Proficiencies': this.subrace + ', ' + this.proficiencyScrape(this.classProficiencies, "class", this.class) + ', ' + this.proficiencyScrape(this.additionalProficiencies, "background", this.background),
                'Abilities': this.subraceabilities,
                'Speed': this.speedCheck(this.createdCharacter[1]),
                'IBF': IdealsBondsFlaws,
                'SpellSlots': this.magicCheck(this.class),
                'IsPublic': true,
                'Equipment': "dogs"
            };
            console.log(newChar);
            this.dndService.save(newChar).then(() => {
                window.sessionStorage.removeItem('char');
                this.$state.go('home');
            }).catch((results) => {
                this.pending = false;
                this.validationMessages = results;
            });
        }
        //simple save
        public simplesave(newChar) {
            console.log('done!');
            this.dndService.save(newChar).then(() => {
            });
        }

        //simple save


        // COMPILE AND SAVE TO DATA BASE METHOD

        


        // STUPID STUPID HALF-ELF's
        public potentialMods = []
        public halfElfsAreStupid() {
                debugger;
            this.showModalHalfElf();
            this.potentialMods.push("+1", "+1", "+1", "+1", "+1");
            for (var x = 0; x < 5; x++) {
                let elements = document.getElementsByName("potentialMod");
                elements[x].className += "badge";
            }
            debugger;
        }
        public traitCap() {
            if (this.addTraitCounter == 2) {
                document.getElementById('potentialStrMod').style.display = 'none';
                document.getElementById('potentialDexMod').style.display = 'none';
                document.getElementById('potentialConMod').style.display = 'none';
                document.getElementById('potentialWisMod').style.display = 'none';
                document.getElementById('potentialIntMod').style.display = 'none';

            }
        }
        public addTraitCounter = 0;
        public addTrait(id) {
            if (id == 0) {
                this.STR = "+1";
                this.addTraitCounter += 1;
                document.getElementById('potentialStrMod').style.display = 'none';
                this.traitCap();
            }
            if (id == 1) {
                this.DEX = "+1";
                this.addTraitCounter += 1;
                document.getElementById('potentialDexMod').style.display = 'none';
                this.traitCap();
            }
            if (id == 2) {
                this.CON = "+1";
                this.addTraitCounter += 1;
                document.getElementById('potentialConMod').style.display = 'none';
                this.traitCap();
            }
            if (id == 3) {
                this.INT = "+1";
                this.addTraitCounter += 1;
                document.getElementById('potentialIntMod').style.display = 'none';
                this.traitCap();
            }
            if (id == 4) {
                this.WIS = "+1";
                this.addTraitCounter += 1;
                document.getElementById('potentialWisMod').style.display = 'none';
                this.traitCap();
            }

        }

        // STUPID STUPID HALF-ELF's

        public jumpTo(link) {
            console.log(link);
            var select = document.getElementById(link);
            select.scrollIntoView();
        }

        // MODAL
        public showModal() {
            this.modalInstance = this.$uibModal.open({
                templateUrl: 'ngApp/views/modals/instructionsModal2.html',
                scope: this.$scope,
                animation: true,
                size: 'md'
                });
        }

        public showModalProficiencies() {
            this.modalInstance = this.$uibModal.open({
                templateUrl: 'ngApp/views/modals/proficiencyModal.html',
                scope: this.$scope,
                animation: true,
                size: 'md'
                });
        }

        public showModalHalfElf() {
            this.modalInstance = this.$uibModal.open({
                templateUrl: 'ngApp/views/modals/halfElfModal.html',
                scope: this.$scope,
                animation: true,
                backdrop: 'static',
                size: 'md'
            });
        }

        public showModalSubmit() {
            this.modalInstance = this.$uibModal.open({
                templateUrl: 'ngApp/views/modals/characterSubmitModal.html',
                scope: this.$scope,
                animation: true,
                backdrop: 'static',
                size: 'sm'
            });
        }

        public close() {
            this.modalInstance.close();
        }

        public closeValidation(index) {
            this.validationMessages.splice(index, 1);
        }

        //CONSTRUCTOR
        constructor(public dndService: DNDCalcSecure.Services.DndService,
                    public accountService: DNDCalcSecure.Services.AccountService,
                    public $state: ng.ui.IStateService,
                    private $uibModal: angular.ui.bootstrap.IModalService,
                    private $scope: angular.IScope) {
            if (this.dndService.newUser()) { this.tooltip.open = true; this.tooltip.message = "Click Me!" };
            this.createdCharacter = sessionStorage.getItem("char").split(",");
            this.class = this.createdCharacter[0];
            this.background = this.createdCharacter[3];
            this.title = this.createdCharacter[2].toString().trim();
            if (this.createdCharacter[2] == 'undefined' || this.createdCharacter[2] == '') { this.title = this.createdCharacter[1] };
            var potentialMods = document.getElementsByClassName("potentialMod");
            for (var x; x < 5; x++) { potentialMods[x].setAttribute("style", "display:none;") };
            if (this.title == "Half Elf") { this.halfElfsAreStupid(); };
            console.log(this.subrace);
            this.abilityModifierReference.push([5], [4], [4], [3], [3], [2], [2], [1], [1], [0], [0], [1], [1], [2], [2], [3], [3], [4], [4], [5], [5]);
            this.subracialMods.push(
                { race: "Human", mods: "1STR,1DEX,1CON,1INT,1WIS,1CHA", Proficiencies: "1 Skill of your choice", Abilities: "none :(" },
                { race: "Wood Elf", mods: "2DEX,1WIS", Proficiencies: "Longsword, Shortsword, Shortbow, Longbow, Perception", Abilities: "35ft Base Speed, Can attempt to hide while lightly obscured" },
                { race: "High Elf", mods: "2DEX,1INT", Proficiencies: "Longsword, Shortsword, Shortbow, Longbow, Language(1), Perception", Abilities: "You know 1 cantrip from the Wizard Spell List" },
                { race: "Mountain Dwarf", mods: "2STR,2CON", Proficiencies: "Light Armor, Medium Armor", Abilities: "none" },
                { race: "Hill Dwarf", mods: "2CON,1WIS", Proficiencies: "Mining", Abilities: "+1 HP Maximum, +1 everytime you level up" },
                { race: "Gray Dwarf", mods: "2CON,1INT", Proficiencies: "Mining", Abilities: "Skill checks are at disadvantage in the sun, 120ft Darkvision" },
                { race: "Deep Gnome", mods: "1DEX,2INT", Proficiencies: "Mining", Abilities: "You know the Minor Illusion Cantrip, and can cast Nondetection at will, 120ft Darkvision" },
                { race: "Forest Gnome", mods: "1DEX,2INT", Proficiencies: "Artisan Tools", Abilities: "You know the Minor Illusion Cantrip, Speak to small beasts, Double Proficiency on INT checks on Magic, Alchemical, or Technological objects" },
                { race: "Lightfoot Halfling", mods: "2DEX,1CHA", Proficiencies: "Navigation", Abilities: "You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you." },
                { race: "Stout Halfling", mods: "2DEX,1CON", Proficiencies: "Resisting Poison", Abilities: "You have advantage on saving throws against poison, and you have resistance against poison damage." },
                { race: "Dragonborn", mods: "2STR,1CHA", Proficiencies: "Breath Weapon", Abilities: "Resistance to one damage type, and a breath weapon" },
                { race: "Half Elf", mods: "2CHA", Proficiencies: "2 of your choice", Abilities: "60ft Darkvision, resistance against being Charmed or put to Sleep" },
                { race: "Half Orc", mods: "2STR,1CON", Proficiencies: "Intimidation", Abilities: "Extra damage die on critical, When dropped to 0hp - can choose to be at 1hp instead" },
                { race: "Tiefling", mods: "2CHA,1INT", Proficiencies: "Reading Infernal", Abilities: "Resistance to Fire, 60ft Darkvision, Thaumaturgy Cantrip"}
            );
            this.classProficiencies.push(
                { class: "Barbarian", Proficiencies: "Light Armor, Medium Armor, Shields, Simple and Martial Weapons" },
                { class: "Bard", Proficiencies: "Light Armor, Simple Weapons, Hand Crossbow, Longsword, Rapier, Shortsword" },
                { class: "Cleric", Proficiencies: "Light Armor, Medium Armor, Shields, Simple Weapons" },
                { class: "Druid", Proficiencies: "Light Armor, Medium Armor, Shields (must not be made of metal)"},
                { class: "Fighter", Proficiencies: "All Armor, Shields, Simple Weapons, Martial Weapons" },
                { class: "Monk", Proficiencies: "Simple weapons, Shortsword" },
                { class: "Ranger", Proficiencies: "Light Armor, Medium Armor, Shields, Simple weapons, Martial Weapons" },
                { class: "Rogue", Proficiencies: "Light Armor, Simple Weapons, Hand Crossbow, Longsword, Rapier, Shortsword, Thieves Tools" },
                { class: "Paladin", Proficiencies: "All Armor, Shields, Simple Weapons, Martial Weapons, " },
                { class: "Sorcerer", Proficiencies: "Dagger, Darts, Sling, Quarterstaff, Light Crossbow" },
                { class: "Warlock", Proficiencies: "Light Armor, Simple Weapons"},
                { class: "Wizard", Proficiencies: "Dagger, Darts, Sling, Quarterstaff, Light Crossbow" }
            );
            this.additionalProficiencies.push(
                { background: "Acolyte", Proficiencies: "Insight, Religion, Language(2)" },
                { background: "Charlatan", Proficiencies: "Deception, Sleight of Hand, Disguise Kit, Forgery Kit" },
                { background: "Criminal", Proficiencies: "Deception, Stealth, Board-Game(1), Thieves Tools" },
                { background: "Entertainer", Proficiencies: "Acrobatics, Performance, Disguise Kit, Musical Instrument(1)" },
                { background: "Folk Hero", Proficiencies: "Animal Handling, Survival, Artisan Tools(1), Vehicles(land)" },
                { background: "Guild Artisan", Proficiencies: "Insight, Persuasion, Artisan Tools(1), Language(1)" },
                { background: "Hermit", Proficiencies: "Medicine, Religion, Herbalism Kit, Language(1)" },
                { background: "Noble", Proficiencies: "History, Persuasion, Board-Game(1), Language(1)" },
                { background: "Outlander", Proficiencies: "Athletics, Survival, Musical Instrument(1), Language(1)" },
                { background: "Sage", Proficiencies: "Arcana, History, Language(2)" },
                { background: "Soldier", Proficiencies: "Athletics, Intimidation, One Board-Game, Vehicles(land)"},
                { background: "Sailor", Proficiencies: "Athletics, Perception, Navigators Tools, Vehicles(water)" },
                { background: "Urchin", Proficiencies: "Stealth, Sleight Of Hand, Disguise Kit, Thieves Tools"}
            );
            for (let b = 0; b < 14; b++) {
                if (this.subracialMods[b].race == this.title) {
                    let split = (this.subracialMods[b].mods).split(",");
                    this.subrace = this.subracialMods[b].Proficiencies;
                    this.subraceabilities = this.subracialMods[b].Abilities;
                    for (let y = 0; y < split.length; y++) {
                        let num = parseInt(split[y]);
                        let char = split[y].slice(1, 4);
                        switch (char) {
                            case "STR":
                                this.STR = "+" + num;
                                break;
                            case "DEX":
                                this.DEX = "+" + num;
                                break;
                            case "CON":
                                this.CON = "+" + num;
                                break;
                            case "WIS":
                                this.WIS = "+" + num;
                                break;
                            case "INT":
                                this.INT = "+" + num;
                                break;
                            case "CHA":
                                this.CHA = "+" + num;
                                break;
                        }
                    }
                };
            }; // Racial Mods Loop
            this.abModifierUpdate();
        }
    }

}

namespace DNDCalcSecure.Controllers {

    export class HomeController {
        public message;
        public dndResource;
        public abilityTitles = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
        public dynamicPopover = {
            title : "cool stuff",
            content: "even cooler stuff"
        }
        public parseAbilityScores(num, index) {
            var scores = this.dndService.parseAbilityScores(num);
            return scores[index];
        }
        public getRandNumb(max, min) {
            return Math.floor((Math.random() * (max - min) + min));
        }
        constructor(public dndService: DNDCalcSecure.Services.DndService, accountService: DNDCalcSecure.Services.AccountService) {
            this.dndResource = dndService.characterResource.query();
            this.message = dndService.getQuote(this.getRandNumb(0,4));
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
            this.secrets = dndService.characterResource.query();
        }
        public isactive = true;
        public savefunction(item) {
            this.isactive = true;

        }
        
    }

    export class DungeonController {

        constructor(public dmService: DNDCalcSecure.Services.DmService) {

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
        public Quote = {};
        public class;
        public race;
        public background;
        subrace2 = [];
        subraceTitles: string[];
        public selectedsubrace;
        
        constructor(dndService: DNDCalcSecure.Services.DndService) {
            this.subraceTitles = ["+1 Wiz", "+2 Str", "+1 Str", "+1 Wiz", "+1 Int", "+1 Dex", "+1 Dex", "+1 Cha", "+1 Con"];
            this.subrace2.push({ race: "Hill Dwarf", title: "+1 Wiz" }, { race: "Mountain Dwarf", title: "+2 Str" }, { race: "Gray Dwarf", title: "+1 Str" }, { race: "Wood Elf", title: "+1 Wiz" }, { race: "High Elf", title: "+1 Int" }, { race: "Deep Gnome", title: "+1 Dex" }, { race: "Forest Gnome", title: "+1 Dex" }, { race: "Lightfoot Halfling", title: "+1 Cha" }, { race: "Stout Halfling", title: "+1 Con" });
            let rand = this.getRandNumb(0, 4);
            this.Quote = dndService.getQuote(rand);
        };
        public getRandNumb(max, min) {
            return Math.floor((Math.random() * (max - min) + min));
        }
        public jumpTo(link) {
            var select = document.getElementById(link);
            select.scrollIntoView();
        }
        public savedata() {
            sessionStorage.setItem("char", this.class + "," + this.race + "," + this.selectedsubrace + "," + this.background);
        }
    }

    export class SaveController {
        public createdCharacter; // class, race, subrace, background
        public characterName;
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

        public traitswap = { 'clicked': false, 'trait': "" };
        public traitswap2 = { 'clicked': false, 'trait': "" };

        public firstclick(trait) {
            if (this.traitswap.clicked == true) {
                this.traitswap2.clicked = true;
                this.traitswap2.trait = trait;
                this.swapmethod();
                return this.traitswap2;
            }
            this.traitswap.clicked = true;
            this.traitswap.trait = trait;
            //console.log(this.traitswap)
        }

        public swapmethod() {
            var swapped = document.getElementById(this.traitswap2.trait).innerText;
            document.getElementById(this.traitswap2.trait).innerText = document.getElementById(this.traitswap.trait).innerText;
            document.getElementById(this.traitswap.trait).innerText = swapped;
            this.traitswap.clicked = false; this.traitswap.trait = "";
            this.traitswap2.clicked = false; this.traitswap2.trait = "";
        }

        //ABILITY SCORE GENERATOR


      
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
        public save() {
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
                'Proficiencies': this.subrace + ', ' + document.getElementById('classproficiencies').innerText + ', ' + document.getElementById('subraceproficiencies').innerText,
                'Abilities': this.subraceabilities,
                'Speed': this.speedCheck(this.createdCharacter[1]),
                'IBF': IdealsBondsFlaws,
                'SpellSlots': this.magicCheck(this.class),
                'IsPublic': true,
                'Equipment': "dogs"
            };
            this.dndService.save(newChar).then(() => {
                window.sessionStorage.removeItem('char');
                this.$state.go('home');
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
            let message = document.getElementById('optionalMessage'); //.innerText = "Half Elfs get 2 additional attribute points of their choice. Choose Wisely, you only get one chance!";
           message.innerText = "Half Elfs get 2 additional ability points of their choice. Choose Wisely!";
            this.potentialMods.push("+1", "+1", "+1", "+1", "+1");
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
                this.WIS = "+1";
                this.addTraitCounter += 1;
                document.getElementById('potentialWisMod').style.display = 'none';
                this.traitCap();
            }
            if (id == 4) {
                this.INT = "+1";
                this.addTraitCounter += 1;
                document.getElementById('potentialIntMod').style.display = 'none';
                this.traitCap();
            }

        }

        // STUPID STUPID HALF-ELF's

        public jumpTo(link) {
            var select = document.getElementById(link);
            select.scrollIntoView();
        }
       

        //CONSTRUCTOR
        constructor(public dndService: DNDCalcSecure.Services.DndService, public accountService: DNDCalcSecure.Services.AccountService, public $state: ng.ui.IStateService) {
            console.log(accountService.isLoggedIn());
            this.createdCharacter = sessionStorage.getItem("char").split(",");
            this.class = this.createdCharacter[0];
            this.background = this.createdCharacter[3];
            this.title = this.createdCharacter[2];
            if (this.createdCharacter[2] == 'undefined') { this.title = this.createdCharacter[1] };
            if (this.title == "Half Elf") { this.halfElfsAreStupid(); };
            console.log(this.subrace);
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
        }
    }

}

namespace DNDCalcSecure.Services {
    export class DndService {
        public characterAPI;
        public characterResource;
        public getQuote(id) {
            if (id == 0) {
                var quote = { 'text': "All journeys have secret destinations of which the traveler is unaware", 'author': "Martin Buber" };
                return quote;
            }
            else if (id == 1) {
                var quote = { 'text': "The real voyage of discovery consists not in seeking new landscapes but in having new eyes", 'author': "Marcel Proust" }
                return quote;
            }
            else if (id == 2) {
                var quote = { 'text': "Bravery is the capacity to perform properly even when scared half to death", 'author': "Omar Bradley" };
                return quote;
            }
            else if (id == 3) {
                var quote = { 'text': "Who dares nothing, need hope for nothing", 'author': "Johann Friedrich Von Schiller" };
                return quote;
            }
            var quote = { 'text': "There’s no such thing as bad weather, only inappropriate clothing", 'author': "Sir Rannulph Fiennes" };
            return quote;
        }

        //parse ability scores
        public parseAbilityScores(int: number) {
            var scores = int.toString();
            var split = scores.split('');
            for (var x = 0; x < split.length; x++) {
                var next = x + 1;
                if (split[x] == "1") {
                    split[x] = split[x] + split[next];
                    split.splice(next, 1);
                }
            }
            return split;
        }
        //parse ability scores

        //parse IBF

        public parseIbf(ibf: string) {
            
            return ibf.split('.');
        }
        //parse IBF

        
        public save(character) {
            return this.$q((resolve, reject) => {
                this.$http.post('/api/characters', character)
                    .then((result) => {
                        resolve(result);
                        this.usedCreationForm();
                    })
                    .catch((result) => {
                        var messages = this.flattenValidation(result.data);
                        reject(messages);
                    });
            });
        }

        public getUserCharacters() {
            return this.$http.get('/api/characters/getUserCharacters');
        }

        private flattenValidation(modelState) {
            let messages = [];
            for (let prop in modelState) {
                messages = messages.concat(modelState[prop]);
            }
            return messages;
        }

        public newUser() {
            if (this.$window.sessionStorage.getItem("newUser") == "true") {
                return true;
            }
            else {
                return false;
            }
        }

        public usedCreationForm() {
            this.$window.sessionStorage.removeItem("newUser");
        }


        constructor(private $resource: ng.resource.IResourceService,
                    private $q: ng.IQService,
                    private $http: ng.IHttpService,
                    private $window: ng.IWindowService) {
            this.characterResource = $resource('/api/characters/:id').query();
        }
    }
    angular.module("DNDCalcSecure").service("dndService", DndService);

    export class DmService {
        constructor() {

        }
        public creatures = [
            {
                name: "HunterShark",
                ac : 12,
                hp: 45,
                speed: "Swim 40ft",
                xp: 450,
                abilityScores: "STR18/+4, DEX13/+1, CON15/+2, INT1/-5, WIS10/+0, CHA4/-3",
                skills: "Perception +2",
                senses: "blindsight 30ft, passive Perception 12",
                challenge: "2 (450xp)",
                abilities: [
                    "Blood Frenzy - The Sahuagin has advantage on melee attack rolls against any creature that doesnt have all its HP",
                    "Can only breathe in water"
                ],
                actions: [
                    "Bite + 6/ reach 5ft 2d8 + 4 pierce"
                ],
            },
            {
                name: "Mezzoloth",
                ac : 18,
                hp : 75,
                speed : "40 ft",
                xp: 1800,
                abilityScores: "STR17/+3, DEX12/+1, CON14/+2, INT20/+5, WIZ16/+3, CHA17/+3",
                skills: "Perception + 3",
                resistances: "cold, fire, lightning, bludgeoning, piercing, slashing, from non-magical weapons",
                immunities: "damage: acid, poison. condition: poisened",
                senses: "blindsight 60ft, darkvision 60ft, passive perception 13",
                languages: "Abyssal, Infernal, telepathy 60ft",
                challenge: "5 (1800XP)",
                spellcasting: "Spell mod CHA DC 11 // 2day - darkness, dispel magic // 1day - cloudkill",
                abilities: ["The mezzoloth has advantage on saving throws against spells and other magical effects.",
                    "the mezzoloth's weapon attacks are magical."
                ],
                actions: [
                    "Multi-attack: one with claws, one with trident.",
                    "Claws: +7 / 2d4 +2 slashing",
                    "Trident: (20/60) +7 / 1d6 + 4 pierce (1d8 two-handed)",
                    "Teleport: The mezzaloth magically teleports, along with any equipment it is wearing or carrying, up to 60 feet to a unoccupied space it can see"
                ],
                spells: [
                    {
                        name: "Darkness", casting: "1 action", range: "60feet", components: "v", duration: "Concentration, up to ten minutes",
                        effect: "Magical darkness spreads from a point you choose within range to fill a 15 foot radius sphere for the duration. " +
                        "the darkness spreads around corners. A creature with darkvision cant see through the darkness, and nonmagical light cant " +
                        "illuminate it."
                    },
                    {
                        name: "Dispel Magic", casting: "1 action", range: 120, components: "vs", duration: "instantaneous",
                        effect: "chose a creature, object, or magical effect within range. Any spell of 3rd level or lower on the target ends. " +
                        "For each spell of 4th level or higher on the target, make an ability check using your spellcasting mod. the DC = 10 + spell lvl."
                    },
                    {
                        name: "Cloudkill", casting: "one action", range: 120, components: "vs", duration: "concentration, up to 10 minutes",
                        effect: "You create a 20 foot radius sphere of poisonous, yellow-green fog centered on a point you choose within range " +
                        "It lasts the duration or until strong wind disperses it. the area is heavily obscured. When a creature enters the spells area " +
                        "for the first time on a turn or starts its turn there, that creature must make a DC11 CON saving throw. 5d8 poison damage " +
                        "on failed save or half as much on success. Creatures are affected even if they hold their breath or dont have to breath " +
                        "The fog moves 10 feet away from you each turn. "
                    }
                ]
            },
            {
                name: "Thug",
                ac: 11,
                hp: 32,
                speed: "30ft",
                xp: 100,
                abilityScores: "STR15/+2, DEX11/+0, CON14/+2, INT10/+0, WIS10/+0, CHA11/+0",
                skills: "Intimidation +2",
                senses: "passive Perception 10",
                languages: "any one language (usually common)",
                challenge: "1/2 (100xp)",
                abilities: "Pack Tactics - The thug has advantage on an attack roll against a creature if at least one of the thugs allies is within 5 feet of the creature and the ally isnt incapacitated.",
                actions: [
                    "multi-attack -> the thug makes two melee attacks",
                    "mace -> +4 / 1d6+2 bludgeoning",
                    "heavy crossbow +2 (100/400) / 1d10 piercing"
                ]
            },
            {
                name: "Veteran",
                ac: 17,
                hp: 58,
                speed: "30ft",
                xp: 700,
                abilityScores: "STR16/+3, DEX14/+1, CON14/+2, INT10/+0, WIS11/+0, CHA10/+0",
                skills: "Athletics +5, Perception +2",
                senses: "perception 12",
                languages: "any one language (usually common)",
                challenge: "3 (700xp)",
                actions: [
                    "multi-attack -> the veteran makes two longsword attacks. if it has a shortsword drawn, it can also make a shortsword attack",
                    "longsword +5/ 1d8+3 piercing",
                    "shortsword +5/ 1d6+3 piercing",
                    "heavy crossbow +3 (100/400)/ 1d10 piercing"
                ]
            },
            {
                name: "Knight",
                ac: 18,
                hp: 52,
                speed: "30ft",
                xp: 700,
                abilityScores: "STR16/+3, DEX11/+0, CON14/+2, INT11/+0, WIZ11/+0, CHA15/+2",
                savingThrows: "Con +4, Wis +2",
                senses: "passive Perception 10",
                languages: "ane one language (usually Common)",
                challenge: "3 (700xp)",
                skills: "brave - the knight has advantage on saving throws against being frightened",
                actions: [
                    "multi-attack -> the knight makes two melee attacks",
                    "greatsword +5 / 2d6+3 slashing",
                    "heavy crossbow + 2 (100/400) / 1d10 piercing",
                    "leadership (1perday)/ For 1 minute, the knight can utter a special comman or warning whenever a nonhostile creature that it can see within 30 feet of it makes an attack roll or saving throw. The creature can add a d4 to its roll provided it can hear and understand the knight."
                ],
                reactions: "parry / the knight adds 2 to its AC against one melee attack that would hit it. to do so, the knight must see the attacker and be wielding a melee weapon."
            }
        ];
        public pull(name) {
            for (var x = 0; x < this.creatures.length; x++) {
                if (name == this.creatures[x].name) { return this.creatures[x]; };
            }
            return;
        }


    };
    angular.module("DNDCalcSecure").service("dmService", DmService);
}
    


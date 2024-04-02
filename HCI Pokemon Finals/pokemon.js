console.log("Hello World");
        let trainer1 = { name: 'Red', region: 'Kalos',
            speak: function(target){
                console.log(`You are challenged by Trainer ${target.name}`);
                console.log(`Trainer ${target.name} sends out Sceptile`);
                console.log(`Go Charizard!`);
            }
        };


        let trainer2 = { name: 'Brendan', region: 'Kanto' };


        function Pokemon(name, health, attack, level){
            this.name = name;
            this.basehealth = health;
            this.health = 2 * health;
            this.attack = attack;
            this.level = level;
            this.atk = function(target){
                let logMessage = `${this.name} used Flamethrower on ${target.name}<br>`;
                logMessage += 'It is Super Effective!<br>';
                target.health -= this.attack;
                logMessage += `${target.name}'s health is reduced to ${Math.max(0, target.health)}<br>`;
                document.getElementById("battle-log").innerHTML += '<li class="list-group-item">' + logMessage + '</li>';
            };


            this.atk2 = function(target){
                let logMessage = `${this.name} used Leaf Blade on ${target.name}<br>`;
                logMessage += 'It is Not Very Effective...<br>';
                target.health -= this.attack;
                logMessage += `${target.name}'s health is reduced to ${Math.max(0, target.health)}<br>`;
                document.getElementById("battle-log").innerHTML += '<li class="list-group-item">' + logMessage + '</li>';
            };


            this.levelUp = function() {
                let logMessage = `${this.name} has leveled up! ${this.level} -> ${this.level + 1}<br>`;
                logMessage += `HP: ${this.basehealth} -> ${this.basehealth + 4}<br>`;
                logMessage += `ATK: ${this.attack} -> ${this.attack + 60}<br>`;
                this.level++;
                this.health += 4;
                this.attack += 60;
                document.getElementById("battle-log").innerHTML += '<li class="list-group-item">' + logMessage + '</li>';
            };
        }


        let Charizard = new Pokemon('Charizard', 356, 231, 99);
        let Sceptile = new Pokemon('Sceptile', 250, 157, 100);


        document.getElementById("start-battle").addEventListener("click", function() {
    trainer1.speak(trainer2);

    document.querySelectorAll('.pokemon-gif').forEach(function(gif) {
        gif.style.display = 'inline-block';
    });

    setTimeout(function() {
        document.querySelectorAll('.pokemon-gif').forEach(function(gif) {
            gif.style.display = 'none';
        });
    }, 5000);

    while (Charizard.health > 0 && Sceptile.health > 0) {
        Charizard.atk(Sceptile);
        if (Sceptile.health <= 0) {
            let logMessage = `${Sceptile.name} fainted!<br>`;
            logMessage += 'Trainer Red wins! Trainer Red receives 5000 Pokemon dollars for winning!<br>';
            document.getElementById("battle-log").innerHTML += '<li class="list-group-item">' + logMessage + '</li>';
            Charizard.levelUp();
            break;
        }
        Sceptile.atk2(Charizard);
        if (Charizard.health <= 0) {
            let logMessage = `${Charizard.name} fainted!<br>`;
            document.getElementById("battle-log").innerHTML += '<li class="list-group-item">' + logMessage + '</li>';
            break;
        }
    }
});
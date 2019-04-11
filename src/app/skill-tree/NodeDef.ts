export const mage: { [name: string]: string[] } = {
    Mage: [],
    Fireball: ['Mage'],
    Electroshock: ['Fireball'],
    Freeze: ['Fireball'],
    Thunderbolt: ['Electroshock'],
    Snowstorm: ['Freeze']
};

export const mageY: { [name: string]: number } = {
    Mage: 50,
    Fireball: 50,
    Electroshock: 75,
    Freeze: 25,
    Thunderbolt: 75,
    Snowstorm: 25,
};

export const warrior: {[name: string]: string[]} = {
    Warrior: [],
    Strike: ['Warrior'],
    Hit: ['Warrior'],
    'Double Strike': ['Strike'],
    Slash: ['Strike'],
    Knockout: ['Hit'],
    'Roundhouse Kick': ['Slash', 'Knockout']
};


export const warriorY: {[name: string]: number} = {
    Warrior: 50,
    Hit: 25,
    Strike: 75,
    'Double Strike': 75,
    Slash: 50,
    Knockout: 25,
    'Roundhouse Kick': 37
};

export class SkillGraph {

    nodesByLevel: SkillNode[][];

    constructor(data: { [name: string]: string[] }, yPos: {[name: string]: number}) {
        const nodesByName: { [name: string]: SkillNode } = {};
        Object.keys(data).forEach(name => nodesByName[name] = new SkillNode(name));
        Object.keys(nodesByName).forEach(name => {
            const dependencies = data[name] == null ? [] : data[name];
            dependencies.forEach(dep => nodesByName[name].addDependency(nodesByName[dep]));
        });

        const nodes = Object.keys(nodesByName).map(name => nodesByName[name]);
        nodes.forEach(node => node.calculateLevels());

        nodes.forEach(node => {
            node.y = yPos[node.name];
            const level = node.level;
            if (this.nodesByLevel == null) {
                this.nodesByLevel = [];
            }
            if (this.nodesByLevel[level] == null) {
                this.nodesByLevel[level] = [];
            }
            this.nodesByLevel[level].push(node);
        });
    }
}

export class SkillNode {
    dependencies: SkillNode[] = [];

    isLocked = true;

    level: number;

    y: number;

    constructor(public readonly name) {
    }

    canBeUnlocked = () => {
        return this.dependencies.findIndex(d => d.isLocked === true) < 0;
    }

    hasDependencyOn(node: SkillNode): boolean {
        const index = this.dependencies.findIndex(dep => {
            if (dep.name === node.name) {
                return true;
            }
            return dep.hasDependencyOn(node);
        });
        return index >= 0;
    }

    addDependency(node: SkillNode) {
        if (node == null) {
            throw Error('Null dependency for: ' + name);
        }

        if (this.hasDependencyOn(node)) {
            throw Error('Dependency exists: ' + this.name + ' on node ' + node.name);
        }

        this.dependencies.push(node);
    }

    calculateLevels() {
        if (this.level != null) {
            return;
        }

        this.dependencies.forEach(d => d.calculateLevels());

        let depLevel = -1;
        this.dependencies.forEach(dep => {
            if (depLevel === -1) {
                depLevel = dep.level;
            } else if (depLevel !== dep.level) {
                throw Error('All dependencies should be on the same level: ' + this.name);
            }
        });

        this.level = depLevel + 1;
    }
}


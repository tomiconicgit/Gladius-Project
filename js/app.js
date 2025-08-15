/*
 * app.js
 *
 * This file contains the complete, merged code for the G.L.A.D.I.U.S. game engine and UI.
 * It combines the core game logic from the previous app.js with the static data from manifest.js,
 * removing the need for module imports and streamlining the application.
 */

// --- Data Manifest ---
const gameManifest = {
    // --- APP ICONS AND DEFINITIONS ---
    appIcons: [
        { name: 'Hacking Tools', icon: 'hacking.png' },
        { name: 'Recruits', icon: 'recruits.png' },
        { name: 'Files', icon: 'files.png' },
        { name: 'Influence', icon: 'influence.png' },
        { name: 'Upgrades', icon: 'upgrades.png' },
        { name: 'Intel', icon: 'intel.png' },
        { name: 'Research', icon: 'research.png' },
        { name: 'World', icon: 'world.png' },
        { name: 'Reputation', icon: 'reputation.png' },
        { name: 'Drones', icon: 'drones.png' },
        { name: 'Satellite', icon: 'satellite.png' }
    ],

    // --- UPGRADES ---
    upgrades: [
        { id: 'upgrade-1', name: 'Quantum Hacking Core', description: 'Increases hacking success by 10% and unlocks new protocols.', cost: 5000, tool: 'Hacking Tools', successBonus: 0.1, clearanceNeeded: 1 },
        { id: 'upgrade-2', name: 'Sentinel Drone Swarm', description: 'Deploys a swarm of autonomous drones, improving all drone missions.', cost: 7500, tool: 'Drones', successBonus: 0.15, clearanceNeeded: 2 },
        { id: 'upgrade-3', name: 'High-Orbit Satellite Uplink', description: 'Access to real-time, high-resolution satellite imagery.', cost: 8000, tool: 'Satellite', successBonus: 0.2, clearanceNeeded: 2 },
        { id: 'upgrade-4', name: 'Global Asset Network', description: 'Expands your contact network, increasing recruit success.', cost: 6000, tool: 'Recruits', successBonus: 0.1, clearanceNeeded: 1 },
        { id: 'upgrade-5', name: 'Psychological Operations Module', description: 'Allows for more effective manipulation of global narratives.', cost: 9000, tool: 'Influence', successBonus: 0.2, clearanceNeeded: 3 },
        { id: 'upgrade-6', name: 'Encrypted Data Siphon', description: 'Enables faster processing of classified files and intel.', cost: 4000, tool: 'Files', successBonus: 0.05, clearanceNeeded: 1 },
        { id: 'upgrade-7', name: 'Advanced Reconnaissance Drones', description: 'Upgrades drone sensors for improved mission success and data collection.', cost: 8500, tool: 'Drones', successBonus: 0.2, clearanceNeeded: 2 },
        { id: 'upgrade-8', name: 'Geo-Synchronous Satellite Array', description: 'Deploys a new network of satellites for real-time global monitoring.', cost: 10000, tool: 'Satellite', successBonus: 0.25, clearanceNeeded: 3 }
    ],

    // --- INTEL LEADS ---
    intelLeads: [
        { id: 'intel-001', name: 'Financial Network Map', description: 'Acquire a detailed map of the Red Room terror cell\'s financial network.', cost: 500, boost: { tool: 'Hacking Tools', bonus: 0.1, missionId: 'task-101' } },
        { id: 'intel-002', name: 'Satellite Scan of Rogue Base', description: 'Purchase detailed satellite images of the rogue general\'s last known location.', cost: 1000, boost: { tool: 'Satellite', bonus: 0.15, missionId: 'task-102' } },
        { id: 'intel-003', name: 'Defector\'s Exfiltration Route', description: 'Secure a safe extraction route for a high-value Chinese defector.', cost: 1500, boost: { tool: 'Recruits', bonus: 0.2, missionId: 'task-103' } },
        { id: 'intel-004', name: 'Stark Industries Blueprints', description: 'Gain access to the technical blueprints of the stolen Stark tech.', cost: 2000, boost: { tool: 'Files', bonus: 0.25, missionId: 'task-109' } }
    ],

    // --- RESEARCH PROJECTS ---
    researchProjects: [
        { id: 'proj-001', name: 'Quantum Encryption Breaker', description: 'Develop an algorithm that doubles hacking success rates. Permanent bonus.', cost: 15000, tool: 'Hacking Tools', successBonus: 0.3, progressRequired: 100 },
        { id: 'proj-002', name: 'Predictive Targeting AI', description: 'A new AI that can predict enemy movements with 90% accuracy. Improves all Satellite missions.', cost: 25000, tool: 'Satellite', successBonus: 0.2, progressRequired: 100 },
        { id: 'proj-003', name: 'Biometric Recognition Suite', description: 'Develop software for instant biometric identification. Improves all Recruit missions.', cost: 20000, tool: 'Recruits', successBonus: 0.25, progressRequired: 100 },
        { id: 'proj-004', name: 'AI-Powered Drone Autonomy', description: 'Develops fully autonomous drones, significantly boosting their efficiency. Permanent bonus.', cost: 30000, tool: 'Drones', successBonus: 0.35, progressRequired: 150 }
    ],

    // --- MISSION & TASK DATA ---
    scenarios: {
        tasks: [
            { id: 'task-101', type: 'hacking', title: 'Cyber Attack on Wall Street', brief: 'A new terror cell, "Red Room," is attempting to cripple the global economy. Hack their servers to stop the attack.', tools: ['Hacking Tools', 'Files'], rewards: { money: 2500, xp: 50, file: 'RedRoom_Manifesto.txt' }, influencedCountries: { usa: 10 }, clearance: 1, factions: ['Red Room'], failureConsequence: { type: 'economic', effect: 'stockMarketCrash', location: 'USA', lat: 40.71, lon: -74.00, timeToRebuild: 5 } },
            { id: 'task-102', type: 'recon', title: 'Locate a Stolen Nuke', brief: 'A rogue general has stolen a tactical nuke. Use satellite and drone surveillance to track its location.', tools: ['Satellite', 'Drones'], rewards: { influence: { russia: 5 }, xp: 75, file: 'RogueGeneral_Brief.txt', tracker: { name: 'Rogue Nuke', lat: 55.75, lon: 37.61 } }, clearance: 2, factions: [], failureConsequence: { type: 'destruction', effect: 'cityNuked', location: 'Omsk, Russia', lat: 54.99, lon: 73.37, timeToRebuild: 20 } },
            { id: 'task-103', type: 'covert', title: 'Exfiltrate High-Value Defector', brief: 'A high-level scientist wishes to defect from China. Use your contacts to secure a safe passage for them.', tools: ['Recruits', 'Files'], rewards: { money: 5000, xp: 100, contact: 'Chen Li' }, influencedCountries: { china: -10, usa: 10 }, clearance: 2, factions: [], failureConsequence: { type: 'political', effect: 'diplomaticCrisis', location: 'China', lat: 39.90, lon: 116.40, timeToRebuild: 5 } },
            { id: 'task-104', type: 'dilemma', title: 'The Leaked Dossier', brief: `A dossier has been leaked revealing a secret alliance between a U.S. Senator and a rival faction. Exposing the truth could spark a political scandal, but burying it would be unethical.`, rewards: { xp: 150 }, clearance: 2, options: [
                { text: 'Expose the document and the Senator.', success: { reputation: { usa: -20 }, factionRelations: { 'A.I.M.': 10 }, stats: { peopleArrested: 1, warsPrevented: 0 } }, failure: { reputation: { usa: -30 }, factionRelations: { 'A.I.M.': 20 }, failureConsequence: { type: 'chaos', effect: 'massPanic', location: 'USA', lat: 40.71, lon: -74.00 } } },
                { text: 'Bury the document and protect the Senator.', success: { reputation: { usa: 20 }, factionRelations: { 'A.I.M.': -20 }, stats: { warsPrevented: 1 } }, failure: { reputation: { usa: -10 }, failureConsequence: { type: 'political', effect: 'diplomaticCrisis', location: 'USA', lat: 40.71, lon: -74.00 } } }
            ]},
            { id: 'task-105', type: 'hacking', title: 'Disrupt Drug Cartel Communications', brief: 'A major international drug cartel is using a new encrypted network. Your mission is to hack it to gather intel and disrupt their operations.', tools: ['Hacking Tools'], rewards: { money: 3000, xp: 60, stats: { drugsCaught: 500 }, file: 'Cartel_Network_Map.txt' }, clearance: 1, factions: ['Cartel'], failureConsequence: { type: 'crime', effect: 'drugsOnStreets', location: 'USA', lat: 34.05, lon: -118.24, timeToRebuild: 3 } },
            { id: 'task-106', type: 'recon', title: 'Sabotage Enemy SpaceX Launch', brief: 'A rival nation is preparing to launch a satellite that could track your movements. Use a recruit to infiltrate the base and sabotage the launch.', tools: ['Recruits'], rewards: { influence: { usa: 10 }, xp: 90, money: 4000 }, clearance: 2, failureConsequence: { type: 'destruction', effect: 'satelliteDestroyed', location: 'Orbit', lat: 28.57, lon: -80.64, timeToRebuild: 10 } },
            { id: 'task-107', type: 'recon', title: 'Track a Missing Submarine', brief: 'A nuclear submarine has gone dark in the Pacific. Use satellite and drones to locate it before tensions escalate.', tools: ['Satellite', 'Drones'], rewards: { influence: { russia: 5, usa: 5 }, xp: 80, stats: { warsPrevented: 1 }, tracker: { name: 'Submarine', lat: 15.00, lon: 175.00 } }, clearance: 2, failureConsequence: { type: 'destruction', effect: 'navalBaseDestroyed', location: 'Pacific Naval Base', lat: 15.00, lon: 175.00, timeToRebuild: 8 } },
            { id: 'task-108', type: 'political', title: 'Prevent a War', brief: `Escalating tensions between Russia and the UK threaten to spark a global conflict. You must mediate a diplomatic solution.`, tools: ['Files', 'Recruits'], rewards: { stats: { warsPrevented: 1 }, xp: 150, influence: { russia: 10, uk: 10 } }, clearance: 3, failureConsequence: { type: 'destruction', effect: 'cityBombed', location: 'Kyiv, Ukraine', lat: 50.45, lon: 30.52, timeToRebuild: 15 } },
            { id: 'task-109', type: 'asset-recovery', title: 'Recover Stolen Stark Industries Tech', brief: `A piece of advanced technology from Stark Industries was stolen. Track it down and recover it to prevent it from being weaponized.`, tools: ['Satellite', 'Drones', 'Recruits'], rewards: { money: 7500, xp: 110, file: 'Stark_Intel_Report.txt', tracker: { name: 'Stark Tech', lat: 34.05, lon: -118.24 } }, influencedCountries: { usa: 20 }, clearance: 2, factions: ['A.I.M.'], failureConsequence: { type: 'terror', effect: 'techWeaponized', location: 'Unknown', lat: 34.05, lon: -118.24, timeToRebuild: 7 } },
            { id: 'task-110', type: 'covert-influence', title: 'Manipulate Media Narrative', brief: 'A global faction is spreading disinformation that could cause mass panic. Use your assets to counter their media campaign.', tools: ['Hacking Tools', 'Recruits'], rewards: { money: 3000, xp: 70, file: 'Disinformation_Network_Schematic.txt' }, influencedCountries: { uk: 5, china: -5 }, clearance: 1, factions: ['Red Room'], failureConsequence: { type: 'chaos', effect: 'massPanic', location: 'Global', lat: 51.50, lon: -0.12, timeToRebuild: 2 } },
            { id: 'task-111', type: 'sabotage', title: 'Disrupt Villain Finances', brief: `A newly-formed villainous group, "A.I.M.", is gaining power by manipulating international markets. Hack their financial accounts to cripple their operations.`, tools: ['Hacking Tools', 'Files'], rewards: { money: 6000, xp: 95, file: 'AIM_Financial_Records.txt' }, influencedCountries: { usa: 15 }, clearance: 2, factions: ['A.I.M.'], failureConsequence: { type: 'economic', effect: 'financialCollapse', location: 'Global', lat: 40.71, lon: -74.00, timeToRebuild: 10 } },
            { id: 'task-112', type: 'recon', title: 'Find Lost Ark', brief: `Rumors of a powerful, ancient artifact have surfaced. Locate the "Ark of the Covenant" before it falls into enemy hands.`, tools: ['Satellite', 'Drones'], rewards: { money: 10000, xp: 140, stats: { elementsFound: 1 } }, clearance: 3, failureConsequence: { type: 'religious', effect: 'artifactUnleashed', location: 'Jerusalem', lat: 31.76, lon: 35.21, timeToRebuild: 12 } },
            { id: 'task-113', type: 'political', title: 'Secure a Nuclear Treaty', brief: `A critical nuclear disarmament treaty is at risk of collapse. You must use diplomatic ties and leverage to ensure its signing.`, tools: ['Files', 'Influence'], rewards: { stats: { warsPrevented: 1 }, xp: 160, influence: { russia: 20, uk: 20 } }, clearance: 3, failureConsequence: { type: 'conflict', effect: 'nuclearTensionsRise', location: 'Global', lat: 55.75, lon: 37.61, timeToRebuild: 18 } },
            { id: 'task-114', type: 'covert', title: 'Rescue Captured Agent', brief: `A top-ranking agent, Agent 007, has been captured by a rival organization. Organize a covert rescue operation.`, tools: ['Recruits', 'Files'], rewards: { money: 7000, xp: 130, contact: 'James Bond', tracker: { name: 'Agent 007', lat: 51.50, lon: -0.12 } }, clearance: 3, failureConsequence: { type: 'security', effect: 'agentExposed', location: 'Unknown', lat: 51.50, lon: -0.12, timeToRebuild: 4 } },
            { id: 'task-115', type: 'asset-recovery', title: 'Intercept Alien Artifact', brief: `A recently crashed meteorite contains an alien artifact with immense power. Use your assets to intercept and secure it.`, tools: ['Drones', 'Recruits', 'Satellite'], rewards: { money: 15000, xp: 200, file: 'Alien_Artifact_Analysis.txt' }, influencedCountries: { usa: 30 }, clearance: 4, failureConsequence: { type: 'existential', effect: 'alienThreat', location: 'Roswell, New Mexico', lat: 33.39, lon: -104.52, timeToRebuild: 50 } },
            {
                id: 'task-116',
                type: 'espionage',
                title: 'Infiltrate Corporate HQ',
                brief: 'Infiltrate a rival corporation\'s headquarters to steal a prototype design. Requires stealth and social engineering.',
                tools: ['Recruits'],
                rewards: { money: 9000, xp: 150, file: 'Prototype_Blueprints.txt' },
                clearance: 3,
                failureConsequence: { type: 'corporate', effect: 'stockMarketTumble', location: 'Tokyo, Japan', lat: 35.68, lon: 139.69, timeToRebuild: 6 }
            }
        ],
        news: [
            { headline: 'Global markets in turmoil following cyber attack.', type: 'economic' },
            { headline: 'Humanitarian crisis escalates in war-torn region.', type: 'humanitarian' },
            { headline: 'New technological breakthrough announced by private firm.', type: 'technology' },
            { headline: 'Diplomatic relations between two major powers at a new low.', type: 'political' }
        ],
        dynamicEvents: [
            {
                id: 'event-001',
                title: 'The Cyber-Sauron Crisis',
                brief: 'An unknown entity, "Cyber-Sauron," has seized control of global financial networks. You must complete a series of missions to expose and neutralize the threat.',
                tasks: ['task-101', 'task-111', 'task-110'],
                reward: { money: 50000, xp: 500, worldSavedTimes: 1 },
                isOngoing: false
            }
        ]
    }
};

// --- Global Game State & UI Management ---
const game = {
    state: {
        screen: 'login',
        screenHistory: [], // New: Stack to track screen history
        unlockedApps: ['Hacking Tools', 'Recruits', 'Files', 'Influence', 'Upgrades', 'Intel', 'Research', 'World', 'Reputation'],
        playerData: {
            rank: 1,
            xp: 0,
            xpToNextLevel: 100,
            funds: 50000,
            clearanceLevel: 1,
            intelBonus: null,
            stats: {
                peopleArrested: 0,
                warsPrevented: 0,
                moneyEarned: 0,
                drugsCaught: 0,
                presidentsSaved: 0,
                worldSavedTimes: 0,
                elementsFound: 0,
                terrorPlotsThwarted: 0,
                assetsRecovered: 0,
                civiliansSaved: 0,
                citiesDestroyed: 0,
                citiesRebuilt: 0
            },
            influence: { usa: 0, russia: 0, china: 0, uk: 0 },
            reputation: {
                usa: 50,
                russia: 50,
                china: 50,
                uk: 50
            },
            toolSkills: {
                'Hacking Tools': 0,
                'Satellite': 0,
                'Drones': 0,
                'Recruits': 0,
                'Files': 0,
                'Influence': 0,
                'Upgrades': 0,
                'R&D': 0
            },
            upgrades: [],
            files: [],
            contacts: [
                { name: 'John Smith', country: 'USA', clearance: 5, use: 'Hacking Tools', notes: 'Master hacker, former NSA. Best for corporate infiltration.' },
                { name: 'Maria Rodriguez', country: 'Spain', clearance: 3, use: 'Recruits', notes: 'Ex-CIA operative with a wide network of field agents.' },
                { name: 'Dr. Anya Sharma', country: 'India', clearance: 4, use: 'Satellite', notes: 'Leads a team of satellite imaging experts.' }
            ],
        },
        world: {
            factions: [
                { name: 'Sentinel', description: 'A global intelligence coalition focused on counter-terrorism and state-sponsored espionage.' },
                { name: 'A.I.M.', description: 'A powerful, rogue technology firm developing advanced weaponry for profit.' },
                { name: 'Red Room', description: 'A secret network of assassins and cyber-terrorists, highly sought after by criminal organizations.' }
            ],
            realPeople: ['Joe Biden', 'Vladimir Putin', 'Xi Jinping', 'Boris Johnson', 'Emmanuel Macron', 'Justin Trudeau', 'Angela Merkel'],
            easterEggs: ['007', 'Iron Man', 'Hulk', 'The Avengers', 'Batman', 'Superman', 'Joker', 'Lex Luthor', 'Obi-Wan Kenobi', 'Groot', 'Voldemort', 'Sauron', 'Neo', 'Terminator'],
            disasterZones: [],
            rebuildingZones: [],
            newsFeed: [],
            factionRelations: {
                'Sentinel': { 'A.I.M.': -80, 'Red Room': -50 },
                'A.I.M.': { 'Sentinel': -80, 'Red Room': 20 },
                'Red Room': { 'Sentinel': -50, 'A.I.M.': 20 }
            },
            mapState: {
                activeTrackers: [],
                heatMapData: [],
                taskLocations: []
            }
        },
        narrative: {
            activeMission: null,
            currentDynamicEvent: null,
            scenarios: gameManifest.scenarios,
            intelLeads: gameManifest.intelLeads,
            research: {
                projects: gameManifest.researchProjects,
                activeProject: null
            }
        },
    },
    screens: {
        'login-screen': document.getElementById('login-screen'),
        'home-screen': document.getElementById('home-screen'),
        'task-screen': document.getElementById('task-screen'),
        'files-screen': document.getElementById('files-screen'),
        'recruits-screen': document.getElementById('recruits-screen'),
        'influence-screen': document.getElementById('influence-screen'),
        'upgrades-screen': document.getElementById('upgrades-screen'),
        'intel-screen': document.getElementById('intel-screen'),
        'research-screen': document.getElementById('research-screen'),
        'world-screen': document.getElementById('world-screen'),
        'reputation-screen': document.getElementById('reputation-screen'),
        'moral-dilemma-screen': document.getElementById('moral-dilemma-screen'),
        'notification-bar': document.getElementById('notification-bar'),
        'message-overlay': document.getElementById('message-overlay')
    },
    elements: {
        'appGrid': document.getElementById('app-grid'),
        'taskTitle': document.getElementById('task-title'),
        'taskBrief': document.getElementById('task-brief'),
        'toolContainer': document.getElementById('tool-options-container'),
        'dataFlow': document.getElementById('data-flow-animation'),
        'messageText': document.getElementById('message-text'),
        'filesList': document.getElementById('files-list'),
        'fileDetails': document.getElementById('file-details'),
        'contactsList': document.getElementById('contacts-list'),
        'contactDetails': document.getElementById('contact-details'),
        'influenceDisplayArea': document.getElementById('influence-display-area'),
        'upgradesContainer': document.getElementById('upgrades-container'),
        'intelLeadsContainer': document.getElementById('intel-leads-container'),
        'researchProjectsContainer': document.getElementById('research-projects-container'),
        'worldStatusContainer': document.getElementById('world-status-container'),
        'reputationContainer': document.getElementById('reputation-container'),
        'dilemmaText': document.getElementById('dilemma-text'),
        'dilemmaOptionsContainer': document.getElementById('dilemma-options-container'),
        'playerFunds': document.getElementById('player-funds'),
        'playerRank': document.getElementById('player-rank'),
        'worldMapCanvas': document.getElementById('world-map-canvas'),
        'taskLocationsList': document.getElementById('task-locations-list'),
        'typingText': document.getElementById('typing-text'),
        'loginButton': document.getElementById('login-button')
    },
    toolSuccessRates: {
        'Hacking Tools': 0.3,
        'Satellite': 0.5,
        'Drones': 0.4,
        'Recruits': 0.2,
        'Influence': 0.1
    },
    appIcons: gameManifest.appIcons
};

// --- SAVE & LOAD FUNCTIONS ---
/**
 * Saves the current game state to localStorage.
 */
function saveGame() {
    console.log('Attempting to save game...');
    const gameState = {
        playerData: game.state.playerData,
        worldState: game.state.world,
        narrativeState: {
            intelLeads: game.state.narrative.intelLeads,
            research: game.state.narrative.research,
            currentDynamicEvent: game.state.narrative.currentDynamicEvent
        }
    };
    try {
        localStorage.setItem('gladius_save_data', JSON.stringify(gameState));
        console.log('Game saved successfully!');
    } catch (error) {
        console.error('Failed to save game:', error);
    }
}

/**
 * Loads the game state from localStorage.
 * @returns {boolean} True if a game was successfully loaded, false otherwise.
 */
function loadGame() {
    console.log('Attempting to load game...');
    try {
        const savedData = localStorage.getItem('gladius_save_data');
        if (savedData) {
            const gameState = JSON.parse(savedData);

            // Restore game state from the loaded data
            game.state.playerData = gameState.playerData;
            game.state.world = gameState.worldState;
            game.state.narrative.intelLeads = gameState.narrativeState.intelLeads;
            game.state.narrative.research = gameState.narrativeState.research;
            game.state.narrative.currentDynamicEvent = gameState.narrativeState.currentDynamicEvent;

            UIManager.updateAllUI(game.state.playerData);
            console.log('Game loaded successfully!');
            return true;
        }
    } catch (error) {
        console.error('Failed to load game:', error);
    }
    console.log('No saved game found. Starting new game.');
    return false;
}

// --- A.N.N.A. AI Briefing System ---
const ANNA = {
    briefTask: (task) => {
        game.state.narrative.activeMission = task;
        if (task.type === 'dilemma') {
            UIManager.navigate('moral-dilemma-screen');
            UIManager.displayDilemma(task);
        } else {
            UIManager.navigate('task-screen');
            UIManager.displayTask(task);
        }
    }
};

// --- Tool Logic ---
const tools = {
    'Hacking Tools': {
        animation: UIManager.animateDataFlow,
        outcome: (task) => {
            const baseRate = game.toolSuccessRates['Hacking Tools'];
            const upgradeBonus = game.state.playerData.upgrades
                .filter(u => u.tool === 'Hacking Tools')
                .reduce((total, upgrade) => total + upgrade.successBonus, 0);
            const toolSkillBonus = game.state.playerData.toolSkills['Hacking Tools'] * 0.05;
            const clearancePenalty = (task.clearance - game.state.playerData.clearanceLevel) * 0.1;
            const intelBonus = game.state.playerData.intelBonus && game.state.playerData.intelBonus.tool === 'Hacking Tools' ? game.state.playerData.intelBonus.bonus : 0;
            const assetBonus = gameEngine.checkAssetBonus('Hacking Tools');
            const finalRate = baseRate + upgradeBonus + toolSkillBonus - clearancePenalty + intelBonus + assetBonus;
            return Math.random() < finalRate;
        }
    },
    'Satellite': {
        animation: UIManager.animateSatelliteScan,
        outcome: (task) => {
            const baseRate = game.toolSuccessRates['Satellite'];
            const upgradeBonus = game.state.playerData.upgrades
                .filter(u => u.tool === 'Satellite')
                .reduce((total, upgrade) => total + upgrade.successBonus, 0);
            const toolSkillBonus = game.state.playerData.toolSkills['Satellite'] * 0.05;
            const clearancePenalty = (task.clearance - game.state.playerData.clearanceLevel) * 0.1;
            const intelBonus = game.state.playerData.intelBonus && game.state.playerData.intelBonus.tool === 'Satellite' ? game.state.playerData.intelBonus.bonus : 0;
            const assetBonus = gameEngine.checkAssetBonus('Satellite');
            const finalRate = baseRate + upgradeBonus + toolSkillBonus - clearancePenalty + intelBonus + assetBonus;
            return Math.random() < finalRate;
        }
    },
    'Drones': {
        animation: UIManager.animateDroneLaunch,
        outcome: (task) => {
            const baseRate = game.toolSuccessRates['Drones'];
            const upgradeBonus = game.state.playerData.upgrades
                .filter(u => u.tool === 'Drones')
                .reduce((total, upgrade) => total + upgrade.successBonus, 0);
            const toolSkillBonus = game.state.playerData.toolSkills['Drones'] * 0.05;
            const clearancePenalty = (task.clearance - game.state.playerData.clearanceLevel) * 0.1;
            const intelBonus = game.state.playerData.intelBonus && game.state.playerData.intelBonus.tool === 'Drones' ? game.state.playerData.intelBonus.bonus : 0;
            const assetBonus = gameEngine.checkAssetBonus('Drones');
            const finalRate = baseRate + upgradeBonus + toolSkillBonus - clearancePenalty + intelBonus + assetBonus;
            return Math.random() < finalRate;
        }
    },
    'Recruits': {
        animation: UIManager.animateRecruitDispatch,
        outcome: (task) => {
            const baseRate = game.toolSuccessRates['Recruits'];
            const upgradeBonus = game.state.playerData.upgrades
                .filter(u => u.tool === 'Recruits')
                .reduce((total, upgrade) => total + upgrade.successBonus, 0);
            const toolSkillBonus = game.state.playerData.toolSkills['Recruits'] * 0.05;
            const clearancePenalty = (task.clearance - game.state.playerData.clearanceLevel) * 0.1;
            const intelBonus = game.state.playerData.intelBonus && game.state.playerData.intelBonus.tool === 'Recruits' ? game.state.playerData.intelBonus.bonus : 0;
            const assetBonus = gameEngine.checkAssetBonus('Recruits');
            const finalRate = baseRate + upgradeBonus + toolSkillBonus - clearancePenalty + intelBonus + assetBonus;
            return Math.random() < finalRate;
        }
    },
    'Influence': {
        animation: UIManager.animateInfluence,
        outcome: (task) => {
            const baseRate = game.toolSuccessRates['Influence'];
            const toolSkillBonus = game.state.playerData.toolSkills['Influence'] * 0.05;
            const clearancePenalty = (task.clearance - game.state.playerData.clearanceLevel) * 0.1;
            const finalRate = baseRate + toolSkillBonus - clearancePenalty;
            return Math.random() < finalRate;
        }
    },
    'Files': { animation: UIManager.animateFileProcessing },
    'Upgrades': {},
    'Intel': {},
    'Research': {}
};

// --- Core Game Engine ---
const gameEngine = {
    checkAssetBonus: (toolType) => {
        const relevantAsset = game.state.playerData.contacts.find(contact => contact.use === toolType);
        if (relevantAsset) {
            UIManager.showNotification(`ASSET BONUS: Your contact, ${relevantAsset.name}, is providing a bonus!`);
            return 0.15;
        }
        return 0;
    },

    generateEvent: () => {
        WorldEventEngine.rebuildWorld();

        const isDynamicEvent = Math.random() < 0.25;

        if (isDynamicEvent) {
            const activeEvent = game.state.narrative.scenarios.dynamicEvents[0];
            game.state.narrative.currentDynamicEvent = activeEvent;
            game.state.narrative.activeMission = activeEvent.tasks[0];
            UIManager.showNotification(`WORLD CRISIS: ${activeEvent.title}!`);
            const firstTask = game.state.narrative.scenarios.tasks.find(t => t.id === activeEvent.tasks[0]);
            ANNA.briefTask(firstTask);
        } else {
            const randomEvent = game.state.narrative.scenarios.tasks[Math.floor(Math.random() * game.state.narrative.scenarios.tasks.length)];
            ANNA.briefTask(randomEvent);
        }

        if (Math.random() > 0.6) {
            newsManager.generateNews(game.state.narrative.scenarios.news);
        }

        if (game.state.narrative.research.activeProject) {
            researchApp.progressProject();
        }
    },

    useTool: (toolName, taskId) => {
        const currentTask = game.state.narrative.scenarios.tasks.find(t => t.id === taskId);

        if (game.state.playerData.clearanceLevel < currentTask.clearance) {
            UIManager.showNotification(`MISSION BLOCKED: Insufficient Clearance. You need Level ${currentTask.clearance}.`);
            return;
        }

        const selectedTool = tools[toolName];
        if (selectedTool && selectedTool.animation) {
            selectedTool.animation();
            setTimeout(() => {
                const success = selectedTool.outcome(currentTask);
                gameEngine.endTask(currentTask, success, toolName);
            }, 3000);
        }
    },

    makeChoice: (choiceIndex) => {
        const currentTask = game.state.narrative.activeMission;
        const choice = currentTask.options[choiceIndex];

        const success = Math.random() < 0.8;

        gameEngine.endTask(currentTask, success, null, choice.success, choice.failure);
    },

    endTask: (task, success, toolUsed, dilemmaSuccessEffects = null, dilemmaFailureEffects = null) => {
        UIManager.hideMessageOverlay();

        let effects;
        if (task.type === 'dilemma') {
            effects = success ? dilemmaSuccessEffects : dilemmaFailureEffects;
            if (success) {
                UIManager.showMessageOverlay("Your choice has been implemented. Results are in...");
            } else {
                UIManager.showMessageOverlay("Your choice has backfired. Consequences are severe...");
            }
        } else {
            if (success) {
                UIManager.showMessageOverlay("Mission Accomplished! Agency funds secured.");
                effects = task.rewards;
            } else {
                UIManager.showMessageOverlay("Mission Failed. Casualties reported.");
                effects = task.failureConsequence;
            }
        }

        if (success) {
            if (effects.money) game.state.playerData.funds += effects.money;
            if (effects.xp) gameEngine.addXP(effects.xp);
            if (effects.stats) {
                for (const stat in effects.stats) {
                    game.state.playerData.stats[stat] += effects.stats[stat];
                }
            }
            if (effects.influence) {
                for (const country in effects.influence) {
                    gameEngine.addInfluence(country, effects.influence[country]);
                }
            }
            if (effects.reputation) {
                for (const country in effects.reputation) {
                    gameEngine.updateReputation(country, effects.reputation[country]);
                }
            }
            if (effects.factionRelations) {
                for (const faction in effects.factionRelations) {
                    gameEngine.updateFactionRelations(faction, effects.factionRelations[faction]);
                }
            }
            if (effects.file) gameEngine.collectFile(effects.file);
            if (effects.contact) gameEngine.addContact(effects.contact);
            if (effects.tracker) {
                gameEngine.trackEntity(effects.tracker);
            }

            if (toolUsed) {
                gameEngine.updateToolSkill(toolUsed);
            }

            const activeEvent = game.state.narrative.currentDynamicEvent;
            if (activeEvent) {
                const taskIndex = activeEvent.tasks.indexOf(task.id);
                if (taskIndex !== -1 && taskIndex < activeEvent.tasks.length - 1) {
                    const nextTaskId = activeEvent.tasks[taskIndex + 1];
                    game.state.narrative.activeMission = game.state.narrative.scenarios.tasks.find(t => t.id === nextTaskId);
                    UIManager.showNotification(`DYNAMIC EVENT ADVANCING: Now on task ${taskIndex + 2} of ${activeEvent.tasks.length}.`);
                } else {
                    gameEngine.completeDynamicEvent(activeEvent);
                }
            }

        } else {
            if (effects.failureConsequence) {
                WorldEventEngine.causeDisaster(effects.failureConsequence);
            }
            if (effects.reputation) {
                for (const country in effects.reputation) {
                    gameEngine.updateReputation(country, effects.reputation[country]);
                }
            }
        }

        // Always clear the active task and generate a new one
        game.state.narrative.activeMission = null;

        // Save the game after the state has been updated
        saveGame();

        setTimeout(() => {
            UIManager.hideMessageOverlay();
            UIManager.navigate('home-screen');
            UIManager.updateAllUI(game.state.playerData);
            if (game.state.narrative.currentDynamicEvent) {
                gameEngine.generateEvent();
            } else {
                setTimeout(gameEngine.generateEvent, 5000);
            }
        }, 2000);
    },

    updateReputation: (country, amount) => {
        if (game.state.playerData.reputation[country] !== undefined) {
            game.state.playerData.reputation[country] = Math.max(-100, Math.min(100, game.state.playerData.reputation[country] + amount));
            UIManager.showNotification(`REPUTATION CHANGE: Your standing with ${country.toUpperCase()} changed by ${amount}.`);
        }
    },

    updateFactionRelations: (faction, amount) => {
        for (const f in game.state.world.factionRelations) {
            if (f === faction) {
                for (const rival in game.state.world.factionRelations[f]) {
                    game.state.world.factionRelations[f][rival] += amount;
                    if (game.state.world.factionRelations[rival]) {
                        game.state.world.factionRelations[rival][f] -= amount;
                    }
                }
            }
        }
        UIManager.showNotification(`FACTION RELATIONSHIP CHANGE: Your actions affected ${faction}'s standing.`);
    },

    updateToolSkill: (toolUsed) => {
        if (game.state.playerData.toolSkills[toolUsed] !== undefined) {
            game.state.playerData.toolSkills[toolUsed]++;
            UIManager.showNotification(`TOOL SKILL UP: ${toolUsed} is now at level ${game.state.playerData.toolSkills[toolUsed]}!`);
        }
    },

    completeDynamicEvent: (event) => {
        event.isOngoing = false;
        game.state.playerData.funds += event.reward.money;
        gameEngine.addXP(event.reward.xp);
        game.state.playerData.stats.worldSavedTimes += event.reward.worldSavedTimes;
        game.state.narrative.currentDynamicEvent = null;
        UIManager.showNotification(`WORLD SAVED! Dynamic event "${event.title}" is complete!`);
        saveGame(); // Save after a major event is completed
    },

    trackEntity: (tracker) => {
        game.state.world.mapState.activeTrackers.push(tracker);
        UIManager.showNotification(`NEW TRACKER: ${tracker.name} is now on the map.`);
    },

    addXP: (amount) => {
        game.state.playerData.xp += amount;
        UIManager.showNotification(`XP GAINED: +${amount}`);
        gameEngine.checkLevelUp();
    },

    checkLevelUp: () => {
        const player = game.state.playerData;
        if (player.xp >= player.xpToNextLevel) {
            player.rank++;
            player.xp = player.xp - player.xpToNextLevel;
            player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.5);
            if (player.rank % 5 === 0) {
                player.clearanceLevel++;
                UIManager.showNotification(`SECURITY CLEARANCE UPGRADED! You are now Level ${player.clearanceLevel}.`);
            }
            UIManager.showNotification(`RANK UP! You are now Rank ${player.rank}!`);
        }
    },

    collectFile: (fileName) => {
        const fileId = `file-${game.state.playerData.files.length + 1}`;
        game.state.playerData.files.push({ id: fileId, name: fileName, influentialCountries: {} });
        UIManager.showNotification(`NEW FILE COLLECTED: ${fileName}`);
    },

    addContact: (contactName) => {
        game.state.playerData.contacts.push({ name: contactName, country: 'Unknown', clearance: 0, use: 'Recruits' });
        UIManager.showNotification(`NEW CONTACT: ${contactName}`);
    },

    addInfluence: (country, amount) => {
        if (game.state.playerData.influence[country] !== undefined) {
            game.state.playerData.influence[country] += amount;
            UIManager.showNotification(`INFLUENCE GAINED: ${country} +${amount}`);
        }
    },
};

// --- World & News Manager ---
const newsManager = {
    generateNews: (newsArray) => {
        const randomNews = newsArray[Math.floor(Math.random() * newsArray.length)];
        game.state.world.newsFeed.unshift({ date: new Date(), text: randomNews.headline });
        UIManager.showNotification(randomNews.headline);
    }
};

// --- World Event and Reconstruction Engine ---
const WorldEventEngine = {
    causeDisaster: (consequence) => {
        UIManager.showNotification(`DISASTER: ${consequence.location} has suffered a major setback due to ${consequence.effect}!`);
        game.state.world.disasterZones.push({
            name: consequence.location,
            effect: consequence.effect,
            reconstructionNeeded: consequence.timeToRebuild,
            currentProgress: 0
        });
        game.state.world.mapState.heatMapData.push({
            location: { lat: consequence.lat, lon: consequence.lon },
            intensity: 50,
            cause: consequence.effect
        });
        if (consequence.effect === 'cityNuked' || consequence.effect === 'cityBombed') {
            game.state.playerData.stats.citiesDestroyed++;
        }
        saveGame(); // Save after a disaster occurs
    },

    rebuildWorld: () => {
        const disastersToRebuild = game.state.world.disasterZones;
        if (disastersToRebuild.length === 0) return;
        const reconstructionCost = Math.floor(game.state.playerData.funds * 0.05);
        if (game.state.playerData.funds > 0) {
            game.state.playerData.funds -= reconstructionCost;
            UIManager.showNotification(`Reconstruction efforts cost you $${reconstructionCost}.`);
        } else {
            UIManager.showNotification(`GLOBAL AID: Due to a lack of funds, we are relying on international aid for reconstruction.`);
        }
        const disaster = disastersToRebuild[0];
        if (disaster) {
            disaster.currentProgress++;
            UIManager.showNotification(`REBUILDING: Progress on ${disaster.name} is at ${Math.floor((disaster.currentProgress / disaster.reconstructionNeeded) * 100)}%`);
            if (disaster.currentProgress >= disaster.reconstructionNeeded) {
                WorldEventEngine.completeReconstruction(disaster);
            }
        }
        UIManager.updateAllUI(game.state.playerData);
    },

    completeReconstruction: (disaster) => {
        UIManager.showNotification(`RECONSTRUCTION COMPLETE: ${disaster.name} has been rebuilt!`);
        game.state.world.disasterZones = game.state.world.disasterZones.filter(d => d.name !== disaster.name);
        game.state.playerData.stats.citiesRebuilt++;
    }
};

// --- App Logic Objects ---
const filesApp = {
    render: () => {
        UIManager.navigate('files-screen');
        UIManager.showFiles(game.state.playerData.files);
    },
    renderFileDetails: (file) => UIManager.showFileDetails(file, (country, influence) => {
        gameEngine.addInfluence(country, influence);
        game.state.playerData.files = game.state.playerData.files.filter(f => f.id !== file.id);
        filesApp.render();
    })
};

const recruitsApp = {
    render: () => {
        UIManager.navigate('recruits-screen');
        UIManager.showRecruits(game.state.playerData.contacts);
    },
    renderContactDetails: (contact) => UIManager.showContactDetails(contact)
};

const influenceApp = {
    render: () => {
        UIManager.navigate('influence-screen');
        UIManager.showInfluence(game.state.playerData.influence, game.state.world.factions, game.state.world.factionRelations);
    },
};

const upgradesApp = {
    render: () => {
        UIManager.navigate('upgrades-screen');
        UIManager.showUpgrades(game.state.playerData.upgrades, game.state.playerData.funds, gameManifest.upgrades),
    },
    purchaseUpgrade: (upgrade) => {
        if (game.state.playerData.funds >= upgrade.cost) {
            game.state.playerData.funds -= upgrade.cost;
            game.state.playerData.upgrades.push(upgrade);
            UIManager.showNotification(`UPGRADE PURCHASED: ${upgrade.name}`);
            UIManager.updateAllUI(game.state.playerData);
            upgradesApp.render();
            saveGame(); // Save after an upgrade is purchased
        } else {
            UIManager.showNotification('INSUFFICIENT FUNDS. MISSION FAILED.');
        }
    }
};

const intelApp = {
    render: () => {
        UIManager.navigate('intel-screen');
        UIManager.showIntel(game.state.narrative.intelLeads, game.state.playerData.funds, (lead) => {
            if (game.state.playerData.funds >= lead.cost) {
                game.state.playerData.funds -= lead.cost;
                game.state.playerData.intelBonus = lead.boost;
                const acquiredLead = game.state.narrative.intelLeads.find(l => l.id === lead.id);
                if (acquiredLead) {
                    acquiredLead.acquired = true;
                }
                UIManager.showNotification(`INTEL PROCESSED: ${lead.name}. Bonus applied to next mission.`);
                UIManager.updateAllUI(game.state.playerData);
                intelApp.render();
                saveGame(); // Save after intel is purchased
            } else {
                UIManager.showNotification('INSUFFICIENT FUNDS. NEED MORE RESOURCES.');
            }
        });
    }
};

const researchApp = {
    render: () => {
        UIManager.navigate('research-screen');
        UIManager.showResearch(game.state.narrative.research, game.state.playerData.funds, (project) => {
            if (game.state.playerData.funds >= project.cost) {
                game.state.playerData.funds -= project.cost;
                game.state.narrative.research.activeProject = { ...project, progress: 0 };
                project.isCurrent = true;
                UIManager.showNotification(`RESEARCH STARTED: ${project.name}.`);
                UIManager.updateAllUI(game.state.playerData);
                researchApp.render();
                saveGame(); // Save when a research project is started
            } else {
                UIManager.showNotification('INSUFFICIENT FUNDS. NEED MORE RESEARCH BUDGET.');
            }
        });
    },
    progressProject: () => {
        const project = game.state.narrative.research.activeProject;
        if (project) {
            const progressIncrease = Math.floor(Math.random() * 10) + 5;
            project.progress += progressIncrease;
            if (project.progress >= 100) {
                project.progress = 100;
                researchApp.completeProject(project);
            }
            researchApp.render();
        }
    },
    completeProject: (project) => {
        UIManager.showNotification(`RESEARCH COMPLETE: ${project.name} is now available!`);
        game.toolSuccessRates[project.tool] += project.successBonus;
        const completedProject = game.state.narrative.research.projects.find(p => p.id === project.id);
        if (completedProject) {
            completedProject.isCompleted = true;
            completedProject.isCurrent = false;
        }
        game.state.narrative.research.activeProject = null;
        game.state.playerData.upgrades.push({
            id: `rnd-upgrade-${project.id}`,
            name: `${project.name} (PERMANENT)`,
            tool: project.tool,
            description: `Permanent success rate boost of ${project.successBonus * 100}% from R&D.`,
            successBonus: project.successBonus
        });
        if (game.state.playerData.toolSkills['R&D'] < 10) {
            game.state.playerData.toolSkills['R&D']++;
        }
        UIManager.updateAllUI(game.state.playerData);
        saveGame(); // Save when a research project is completed
    }
};

const worldApp = {
    render: () => {
        UIManager.navigate('world-screen');
        worldApp.drawMap();
    },

    drawMap: () => {
        const canvas = game.elements.worldMapCanvas;
        if (!canvas) {
            console.error("Canvas element not found!");
            return;
        }
        const ctx = canvas.getContext('2d');
        const mapWidth = canvas.width;
        const mapHeight = canvas.height;

        ctx.clearRect(0, 0, mapWidth, mapHeight);
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, mapWidth, mapHeight);

        const toPixel = (lat, lon) => {
            const x = (lon + 180) * (mapWidth / 360);
            const y = (90 - lat) * (mapHeight / 180);
            return { x, y };
        };

        ctx.strokeStyle = '#0055ff';
        ctx.lineWidth = 1;

        game.state.world.mapState.heatMapData.forEach(hotspot => {
            const pos = toPixel(hotspot.location.lat, hotspot.location.lon);
            const radius = hotspot.intensity * 0.5;
            const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius);
            gradient.addColorStop(0, 'rgba(255, 0, 0, 0.7)');
            gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
            ctx.fill();
        });

        game.state.world.mapState.activeTrackers.forEach(tracker => {
            const pos = toPixel(tracker.location.lat, tracker.location.lon);
            ctx.fillStyle = '#00ffc8';
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.font = '10px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText(tracker.name, pos.x + 8, pos.y + 3);
        });

        const taskLocationsList = game.elements.taskLocationsList;
        taskLocationsList.innerHTML = '<h3>Available Missions</h3>';
        game.state.narrative.scenarios.tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.title;
            taskLocationsList.appendChild(taskItem);
        });
    }
};

const reputationApp = {
    render: () => {
        UIManager.navigate('reputation-screen');
        UIManager.showReputation(game.state.playerData.reputation);
    }
};

// --- UI & Event Listeners ---
const UIManager = {
    // New: Screen history and navigation functions
    navigate: (screenName) => {
        const currentScreen = game.state.screen;
        if (currentScreen !== screenName) {
            game.state.screenHistory.push(currentScreen);
            UIManager.showScreen(screenName);
        }
    },
    goBack: () => {
        if (game.state.screenHistory.length > 0) {
            const lastScreen = game.state.screenHistory.pop();
            UIManager.showScreen(lastScreen);
        }
    },
    showScreen: (screenName) => {
        for (const screen in game.screens) {
            if (game.screens[screen] && game.screens[screen].classList) {
                game.screens[screen].classList.remove('active');
            }
        }
        if (game.screens[screenName]) {
            game.screens[screenName].classList.add('active');
            game.state.screen = screenName;
        }
    },

    displayTask: (task) => {
        game.elements.taskTitle.textContent = task.title;
        game.elements.taskBrief.textContent = `[CLASSIFIED LEVEL: ${task.clearance}] \n\n ${task.brief}`;
        UIManager.displayToolOptions(task.tools, task.id);
    },

    displayDilemma: (task) => {
        game.elements.dilemmaText.textContent = task.brief;
        game.elements.dilemmaOptionsContainer.innerHTML = '';

        task.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = option.text;
            button.addEventListener('click', () => {
                gameEngine.makeChoice(index);
            });
            game.elements.dilemmaOptionsContainer.appendChild(button);
        });
    },

    displayToolOptions: (tools, taskId) => {
        game.elements.toolContainer.innerHTML = '';
        tools.forEach(tool => {
            const button = document.createElement('button');
            button.textContent = tool;
            button.className = 'tool-button';
            button.addEventListener('click', () => {
                gameEngine.useTool(tool, taskId);
            });
            game.elements.toolContainer.appendChild(button);
        });
    },

    showNotification: (text) => {
        const notification = document.createElement('div');
        notification.className = 'notification-item';
        notification.textContent = text;
        game.screens['notification-bar'].prepend(notification);
        setTimeout(() => notification.classList.add('visible'), 100);
        setTimeout(() => notification.classList.remove('visible'), 5000);
        setTimeout(() => notification.remove(), 6000);
    },

    showMessageOverlay: (text) => {
        const overlay = game.screens['message-overlay'];
        const messageText = game.elements['message-text'];
        messageText.textContent = text;
        overlay.classList.add('visible');
    },

    hideMessageOverlay: () => {
        const overlay = game.screens['message-overlay'];
        overlay.classList.remove('visible');
    },

    updateAllUI: (playerData) => {
        game.elements.playerFunds.textContent = `Funds: $${playerData.funds.toLocaleString()}`;
        game.elements.playerRank.textContent = `Rank: ${playerData.rank}`;
    },

    setupAppIcons: () => {
        game.elements.appGrid.innerHTML = '';
        game.state.unlockedApps.forEach(appName => {
            const app = game.appIcons.find(a => a.name === appName);
            const appIcon = document.createElement('div');
            appIcon.className = 'app-icon';
            appIcon.innerHTML = `<img src="/images/app-icons/${app.icon}" alt="${app.name} App"><span>${app.name}</span>`;

            switch (appName) {
                case 'Recruits': appIcon.addEventListener('click', () => recruitsApp.render()); break;
                case 'Files': appIcon.addEventListener('click', () => filesApp.render()); break;
                case 'Influence': appIcon.addEventListener('click', () => influenceApp.render()); break;
                case 'Upgrades': appIcon.addEventListener('click', () => upgradesApp.render()); break;
                case 'Intel': appIcon.addEventListener('click', () => intelApp.render()); break;
                case 'Research': appIcon.addEventListener('click', () => researchApp.render()); break;
                case 'World': appIcon.addEventListener('click', () => worldApp.render()); break;
                case 'Reputation': appIcon.addEventListener('click', () => reputationApp.render()); break;
                default: appIcon.addEventListener('click', () => UIManager.showNotification(`App "${appName}" is under development.`));
            }
            game.elements.appGrid.appendChild(appIcon);
        });
    },

    showFiles: (files) => {
        const fileList = game.elements.filesList;
        fileList.innerHTML = '';
        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.textContent = file.name;
            fileItem.addEventListener('click', () => filesApp.renderFileDetails(file));
            fileList.appendChild(fileItem);
        });
    },

    showFileDetails: (file) => {
        const details = game.elements.fileDetails;
        details.innerHTML = `<h3>${file.name}</h3><p>ID: ${file.id}</p>`;
    },

    showRecruits: (contacts) => {
        const contactsList = game.elements.contactsList;
        contactsList.innerHTML = '<h3>Your Contacts</h3>';
        contacts.forEach(contact => {
            const contactItem = document.createElement('div');
            contactItem.className = 'contact-item';
            contactItem.textContent = contact.name;
            contactItem.addEventListener('click', () => recruitsApp.renderContactDetails(contact));
            contactsList.appendChild(contactItem);
        });
    },

    showContactDetails: (contact) => {
        const detailsPanel = game.elements.contactDetails;
        detailsPanel.innerHTML = `<div class="contact-card"><h3>${contact.name}</h3><p><strong>Country:</strong> ${contact.country}</p><p><strong>Clearance Level:</strong> ${contact.clearance}</p><p><strong>Primary Use:</strong> ${contact.use}</p><p><strong>Notes:</strong> ${contact.notes}</p></div>`;
    },

    showInfluence: (influence, factions, factionRelations) => {
        const displayArea = game.elements.influenceDisplayArea;
        displayArea.innerHTML = '<h3>Global Influence Overview</h3>';
        for (const country in influence) {
            const influenceBar = document.createElement('div');
            const influenceScore = influence[country];
            influenceBar.className = 'influence-bar-container';
            influenceBar.innerHTML = `<p>${country.toUpperCase()}: ${influenceScore}</p><div class="influence-bar"><div class="influence-level" style="width: ${Math.abs(influenceScore)}%; background-color: ${influenceScore >= 0 ? '#00ffc8' : '#dc3545'};"></div></div>`;
            displayArea.appendChild(influenceBar);
        }
        displayArea.innerHTML += '<h3>Faction Relations</h3>';
        const relationsList = document.createElement('ul');
        for (const faction1 in factionRelations) {
            for (const faction2 in factionRelations[faction1]) {
                const relationItem = document.createElement('li');
                const score = factionRelations[faction1][faction2];
                relationItem.textContent = `${faction1} vs ${faction2}: ${score}`;
                relationsList.appendChild(relationItem);
            }
        }
        displayArea.appendChild(relationsList);
    },

    showUpgrades: (upgrades, funds, manifestUpgrades) => {
        const container = game.elements.upgradesContainer;
        container.innerHTML = '';
        manifestUpgrades.forEach(upgrade => {
            const upgradePurchased = upgrades.some(u => u.id === upgrade.id);
            const card = document.createElement('div');
            card.className = 'upgrade-card';
            card.innerHTML = `<h3>${upgrade.name}</h3><p>${upgrade.description}</p><p>Cost: $${upgrade.cost}</p>`;
            const button = document.createElement('button');
            button.textContent = upgradePurchased ? 'PURCHASED' : 'PURCHASE';
            button.disabled = upgradePurchased || funds < upgrade.cost;
            button.addEventListener('click', () => upgradesApp.purchaseUpgrade(upgrade));
            card.appendChild(button);
            container.appendChild(card);
        });
    },
    showIntel: (leads, funds, processFunc) => {
        const container = game.elements.intelLeadsContainer;
        container.innerHTML = '';
        leads.forEach(lead => {
            if (!lead.acquired) {
                const card = document.createElement('div');
                card.className = 'intel-card';
                card.innerHTML = `<h3>${lead.name}</h3><p>${lead.description}</p><p>Cost: $${lead.cost}</p>`;
                const button = document.createElement('button');
                button.textContent = 'PROCESS INTEL';
                button.disabled = funds < lead.cost;
                button.addEventListener('click', () => processFunc(lead));
                card.appendChild(button);
                container.appendChild(card);
            }
        });
    },
    showResearch: (researchState, funds, startFunc) => {
        const container = game.elements.researchProjectsContainer;
        container.innerHTML = '';
        if (researchState.activeProject) {
            const project = researchState.activeProject;
            container.innerHTML = `<h3>Active: ${project.name}</h3><p>Progress: ${project.progress}%</p>`;
        } else {
            researchState.projects.forEach(project => {
                if (!project.isCompleted) {
                    const card = document.createElement('div');
                    card.className = 'research-card';
                    card.innerHTML = `<h3>${project.name}</h3><p>${project.description}</p><p>Cost: $${project.cost}</p>`;
                    const button = document.createElement('button');
                    button.textContent = 'START RESEARCH';
                    button.disabled = funds < project.cost;
                    button.addEventListener('click', () => startFunc(project));
                    card.appendChild(button);
                    container.appendChild(card);
                }
            });
        }
    },
    showWorld: (disasterZones) => {
        const container = game.elements.worldStatusContainer;
        container.innerHTML = '<h3>Global Status Report</h3>';
        if (disasterZones.length === 0) {
            container.innerHTML += '<p>The world is at peace.</p>';
        } else {
            disasterZones.forEach(zone => {
                const progress = Math.floor((zone.currentProgress / zone.reconstructionNeeded) * 100);
                const zoneElement = document.createElement('div');
                zoneElement.className = 'world-status-item';
                zoneElement.innerHTML = `<h4>${zone.name}</h4><p>Status: Under Reconstruction (${progress}%)</p>`;
                container.appendChild(zoneElement);
            });
        }
    },
    showReputation: (reputation) => {
        const container = game.elements.reputationContainer;
        container.innerHTML = '<h3>Global Reputation</h3>';
        for (const country in reputation) {
            const repElement = document.createElement('div');
            repElement.className = 'reputation-item';
            repElement.innerHTML = `<h4>${country.toUpperCase()}</h4><p>Score: ${reputation[country]}</p>`;
            container.appendChild(repElement);
        }
    },
    // Tool Animations - Reused from previous logic
    animateDataFlow: () => UIManager.showMessageOverlay("Accessing secure data link..."),
    animateSatelliteScan: () => UIManager.showMessageOverlay("Scanning area with satellite..."),
    animateDroneLaunch: () => UIManager.showMessageOverlay("Dispatching drone..."),
    animateRecruitDispatch: () => UIManager.showMessageOverlay("Deploying field operative..."),
    animateInfluence: () => UIManager.showMessageOverlay("Deploying diplomatic channels..."),
    animateFileProcessing: () => UIManager.showMessageOverlay("Processing classified files..."),

    // New Typing Animation for Login Screen
    async animateLoginSequence() {
        const loginPanel = document.getElementById('login-panel');
        const loginHeader = loginPanel.querySelector('.login-header');
        const loginSubHeader = loginPanel.querySelector('.login-sub-header');
        const loginInputBox = loginPanel.querySelector('.login-input-box');
        const loginFooter = loginPanel.querySelector('.login-footer-text');

        // Hide the main login elements for the animation
        loginHeader.style.opacity = '0';
        loginSubHeader.style.opacity = '0';
        loginInputBox.style.opacity = '0';
        loginFooter.style.opacity = '0';
        game.elements.loginButton.style.opacity = '0';

        // Create the element for the typing effect
        const typingElement = document.createElement('h3');
        typingElement.classList.add('typing-text');
        loginPanel.appendChild(typingElement);

        const messages = [
            'Initializing Secure Uplink...',
            'Authenticating Agent Credentials...',
            'Accessing G.L.A.D.I.U.S. Terminal...',
            'Access Granted. Welcome, Agent.'
        ];

        // Loop through messages and "type" them out
        for (const message of messages) {
            typingElement.textContent = '';
            await new Promise(resolve => {
                let i = 0;
                const typingInterval = setInterval(() => {
                    if (i < message.length) {
                        typingElement.textContent += message.charAt(i);
                        i++;
                    } else {
                        clearInterval(typingInterval);
                        setTimeout(resolve, 1000); // Pause for a second after each message
                    }
                }, 40); // Typing speed
            });
        }
        
        // After the animation, transition to the home screen
        typingElement.style.opacity = '0';
        setTimeout(() => {
            UIManager.navigate('home-screen');
            gameEngine.generateEvent();
        }, 500);
    }
};

// --- Initial Setup ---
window.onload = () => {
    // Add event listeners to back buttons
    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', UIManager.goBack);
    });

    if (!loadGame()) {
        UIManager.showScreen('login-screen');
    } else {
        UIManager.showScreen('home-screen');
        UIManager.updateAllUI(game.state.playerData);
    }

    UIManager.setupAppIcons();

    // Login button now triggers the new animation
    game.elements.loginButton.addEventListener('click', UIManager.animateLoginSequence);
};

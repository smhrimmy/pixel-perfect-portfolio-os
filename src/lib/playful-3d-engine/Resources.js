import * as THREE from 'three'

import Loader from './Utils/Loader.js'
import EventEmitter from './Utils/EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor()
    {
        super()

        this.loader = new Loader()
        this.items = {}

        this.loader.load([
            // Matcaps
            { name: 'matcapBeige', source: '/playful-3d/models/matcaps/beige.png', type: 'texture' },
            { name: 'matcapBlack', source: '/playful-3d/models/matcaps/black.png', type: 'texture' },
            { name: 'matcapOrange', source: '/playful-3d/models/matcaps/orange.png', type: 'texture' },
            { name: 'matcapRed', source: '/playful-3d/models/matcaps/red.png', type: 'texture' },
            { name: 'matcapWhite', source: '/playful-3d/models/matcaps/white.png', type: 'texture' },
            { name: 'matcapGreen', source: '/playful-3d/models/matcaps/green.png', type: 'texture' },
            { name: 'matcapBrown', source: '/playful-3d/models/matcaps/brown.png', type: 'texture' },
            { name: 'matcapGray', source: '/playful-3d/models/matcaps/gray.png', type: 'texture' },
            { name: 'matcapEmeraldGreen', source: '/playful-3d/models/matcaps/emeraldGreen.png', type: 'texture' },
            { name: 'matcapPurple', source: '/playful-3d/models/matcaps/purple.png', type: 'texture' },
            { name: 'matcapBlue', source: '/playful-3d/models/matcaps/blue.png', type: 'texture' },
            { name: 'matcapYellow', source: '/playful-3d/models/matcaps/yellow.png', type: 'texture' },
            { name: 'matcapMetal', source: '/playful-3d/models/matcaps/metal.png', type: 'texture' },
            // { name: 'matcapGold', source: '/playful-3d/models/matcaps/gold.png', type: 'texture' },

            // Intro
            { name: 'introStaticBase', source: '/playful-3d/models/intro/static/base.glb' },
            { name: 'introStaticCollision', source: '/playful-3d/models/intro/static/collision.glb' },
            { name: 'introStaticFloorShadow', source: '/playful-3d/models/intro/static/floorShadow.png', type: 'texture' },

            { name: 'introInstructionsLabels', source: '/playful-3d/models/intro/instructions/labels.glb' },
            { name: 'introInstructionsArrows', source: '/playful-3d/models/intro/instructions/arrows.png', type: 'texture' },
            { name: 'introInstructionsControls', source: '/playful-3d/models/intro/instructions/controls.png', type: 'texture' },
            { name: 'introInstructionsOther', source: '/playful-3d/models/intro/instructions/other.png', type: 'texture' },

            { name: 'introArrowKeyBase', source: '/playful-3d/models/intro/arrowKey/base.glb' },
            { name: 'introArrowKeyCollision', source: '/playful-3d/models/intro/arrowKey/collision.glb' },

            { name: 'introBBase', source: '/playful-3d/models/intro/b/base.glb' },
            { name: 'introBCollision', source: '/playful-3d/models/intro/b/collision.glb' },

            { name: 'introRBase', source: '/playful-3d/models/intro/r/base.glb' },
            { name: 'introRCollision', source: '/playful-3d/models/intro/r/collision.glb' },

            { name: 'introUBase', source: '/playful-3d/models/intro/u/base.glb' },
            { name: 'introUCollision', source: '/playful-3d/models/intro/u/collision.glb' },

            { name: 'introNBase', source: '/playful-3d/models/intro/n/base.glb' },
            { name: 'introNCollision', source: '/playful-3d/models/intro/n/collision.glb' },

            { name: 'introOBase', source: '/playful-3d/models/intro/o/base.glb' },
            { name: 'introOCollision', source: '/playful-3d/models/intro/o/collision.glb' },

            { name: 'introSBase', source: '/playful-3d/models/intro/s/base.glb' },
            { name: 'introSCollision', source: '/playful-3d/models/intro/s/collision.glb' },

            { name: 'introIBase', source: '/playful-3d/models/intro/i/base.glb' },
            { name: 'introICollision', source: '/playful-3d/models/intro/i/collision.glb' },

            { name: 'introMBase', source: '/playful-3d/models/intro/m/base.glb' },
            { name: 'introMCollision', source: '/playful-3d/models/intro/m/collision.glb' },

            { name: 'introCreativeBase', source: '/playful-3d/models/intro/creative/base.glb' },
            { name: 'introCreativeCollision', source: '/playful-3d/models/intro/creative/collision.glb' },

            { name: 'introDevBase', source: '/playful-3d/models/intro/dev/base.glb' },
            { name: 'introDevCollision', source: '/playful-3d/models/intro/dev/collision.glb' },

            // Intro
            { name: 'crossroadsStaticBase', source: '/playful-3d/models/crossroads/static/base.glb' },
            { name: 'crossroadsStaticCollision', source: '/playful-3d/models/crossroads/static/collision.glb' },
            { name: 'crossroadsStaticFloorShadow', source: '/playful-3d/models/crossroads/static/floorShadow.png', type: 'texture' },

            // Car default
            { name: 'carDefaultChassis', source: '/playful-3d/models/car/default/chassis.glb' },
            { name: 'carDefaultWheel', source: '/playful-3d/models/car/default/wheel.glb' },
            { name: 'carDefaultBackLightsBrake', source: '/playful-3d/models/car/default/backLightsBrake.glb' },
            { name: 'carDefaultBackLightsReverse', source: '/playful-3d/models/car/default/backLightsReverse.glb' },
            { name: 'carDefaultAntena', source: '/playful-3d/models/car/default/antena.glb' },
            // { name: 'carDefaultBunnyEarLeft', source: '/playful-3d/models/car/default/bunnyEarLeft.glb' },
            // { name: 'carDefaultBunnyEarRight', source: '/playful-3d/models/car/default/bunnyEarRight.glb' },

            // Car default
            { name: 'carCyberTruckChassis', source: '/playful-3d/models/car/cyberTruck/chassis.glb' },
            { name: 'carCyberTruckWheel', source: '/playful-3d/models/car/cyberTruck/wheel.glb' },
            { name: 'carCyberTruckBackLightsBrake', source: '/playful-3d/models/car/cyberTruck/backLightsBrake.glb' },
            { name: 'carCyberTruckBackLightsReverse', source: '/playful-3d/models/car/cyberTruck/backLightsReverse.glb' },
            { name: 'carCyberTruckAntena', source: '/playful-3d/models/car/cyberTruck/antena.glb' },

            // Project
            { name: 'projectsBoardStructure', source: '/playful-3d/models/projects/board/structure.glb' },
            { name: 'projectsBoardCollision', source: '/playful-3d/models/projects/board/collision.glb' },
            { name: 'projectsBoardStructureFloorShadow', source: '/playful-3d/models/projects/board/floorShadow.png', type: 'texture' },
            { name: 'projectsBoardPlane', source: '/playful-3d/models/projects/board/plane.glb' },

            { name: 'projectsDistinctionsAwwwardsBase', source: '/playful-3d/models/projects/distinctions/awwwards/base.glb' },
            { name: 'projectsDistinctionsAwwwardsCollision', source: '/playful-3d/models/projects/distinctions/awwwards/collision.glb' },
            { name: 'projectsDistinctionsFWABase', source: '/playful-3d/models/projects/distinctions/fwa/base.glb' },
            { name: 'projectsDistinctionsFWACollision', source: '/playful-3d/models/projects/distinctions/fwa/collision.glb' },
            { name: 'projectsDistinctionsCSSDABase', source: '/playful-3d/models/projects/distinctions/cssda/base.glb' },
            { name: 'projectsDistinctionsCSSDACollision', source: '/playful-3d/models/projects/distinctions/cssda/collision.glb' },

            { name: 'projectsLuniFloor', source: '/playful-3d/models/projects/luni/floorTexture.webp', type: 'texture' },
            { name: 'projectsBonhomme10ansFloor', source: '/playful-3d/models/projects/bonhomme10ans/floorTexture.webp', type: 'texture' },
            { name: 'projectsThreejsJourneyFloor', source: '/playful-3d/models/projects/threejsJourney/floorTexture.webp', type: 'texture' },
            { name: 'projectsMadboxFloor', source: '/playful-3d/models/projects/madbox/floorTexture.png', type: 'texture' },
            { name: 'projectsScoutFloor', source: '/playful-3d/models/projects/scout/floorTexture.png', type: 'texture' },
            { name: 'projectsChartogneFloor', source: '/playful-3d/models/projects/chartogne/floorTexture.png', type: 'texture' },
            // { name: 'projectsZenlyFloor', source: '/playful-3d/models/projects/zenly/floorTexture.png', type: 'texture' },
            { name: 'projectsCitrixRedbullFloor', source: '/playful-3d/models/projects/citrixRedbull/floorTexture.png', type: 'texture' },
            { name: 'projectsPriorHoldingsFloor', source: '/playful-3d/models/projects/priorHoldings/floorTexture.png', type: 'texture' },
            { name: 'projectsOranoFloor', source: '/playful-3d/models/projects/orano/floorTexture.png', type: 'texture' },
            // { name: 'projectsGleecChatFloor', source: '/playful-3d/models/projects/gleecChat/floorTexture.png', type: 'texture' },
            // { name: 'projectsKepplerFloor', source: '/playful-3d/models/projects/keppler/floorTexture.png', type: 'texture' },

            // Information
            { name: 'informationStaticBase', source: '/playful-3d/models/information/static/base.glb' },
            { name: 'informationStaticCollision', source: '/playful-3d/models/information/static/collision.glb' },
            { name: 'informationStaticFloorShadow', source: '/playful-3d/models/information/static/floorShadow.png', type: 'texture' },

            { name: 'informationBaguetteBase', source: '/playful-3d/models/information/baguette/base.glb' },
            { name: 'informationBaguetteCollision', source: '/playful-3d/models/information/baguette/collision.glb' },

            { name: 'informationContactTwitterLabel', source: '/playful-3d/models/information/static/contactTwitterLabel.png', type: 'texture' },
            { name: 'informationContactGithubLabel', source: '/playful-3d/models/information/static/contactGithubLabel.png', type: 'texture' },
            { name: 'informationContactLinkedinLabel', source: '/playful-3d/models/information/static/contactLinkedinLabel.png', type: 'texture' },
            { name: 'informationContactMailLabel', source: '/playful-3d/models/information/static/contactMailLabel.png', type: 'texture' },

            { name: 'informationActivities', source: '/playful-3d/models/information/static/activities.png', type: 'texture' },

            // Playground
            { name: 'playgroundStaticBase', source: '/playful-3d/models/playground/static/base.glb' },
            { name: 'playgroundStaticCollision', source: '/playful-3d/models/playground/static/collision.glb' },
            { name: 'playgroundStaticFloorShadow', source: '/playful-3d/models/playground/static/floorShadow.png', type: 'texture' },

            // Brick
            { name: 'brickBase', source: '/playful-3d/models/brick/base.glb' },
            { name: 'brickCollision', source: '/playful-3d/models/brick/collision.glb' },

            // Horn
            { name: 'hornBase', source: '/playful-3d/models/horn/base.glb' },
            { name: 'hornCollision', source: '/playful-3d/models/horn/collision.glb' },

            // // Distinction A
            // { name: 'distinctionAStaticBase', source: '/playful-3d/models/distinctionA/static/base.glb' },
            // { name: 'distinctionAStaticCollision', source: '/playful-3d/models/distinctionA/static/collision.glb' },
            // { name: 'distinctionAStaticFloorShadow', source: '/playful-3d/models/distinctionA/static/floorShadow.png', type: 'texture' },

            // // Distinction B
            // { name: 'distinctionBStaticBase', source: '/playful-3d/models/distinctionB/static/base.glb' },
            // { name: 'distinctionBStaticCollision', source: '/playful-3d/models/distinctionB/static/collision.glb' },
            // { name: 'distinctionBStaticFloorShadow', source: '/playful-3d/models/distinctionB/static/floorShadow.png', type: 'texture' },

            // // Distinction C
            // { name: 'distinctionCStaticBase', source: '/playful-3d/models/distinctionC/static/base.glb' },
            // { name: 'distinctionCStaticCollision', source: '/playful-3d/models/distinctionC/static/collision.glb' },
            // { name: 'distinctionCStaticFloorShadow', source: '/playful-3d/models/distinctionC/static/floorShadow.png', type: 'texture' },

            // // Cone
            // { name: 'coneBase', source: '/playful-3d/models/cone/base.glb' },
            // { name: 'coneCollision', source: '/playful-3d/models/cone/collision.glb' },

            // // Awwwards trophy
            // { name: 'awwwardsTrophyBase', source: '/playful-3d/models/awwwardsTrophy/base.glb' },
            // { name: 'awwwardsTrophyCollision', source: '/playful-3d/models/awwwardsTrophy/collision.glb' },

            // Webby trophy
            { name: 'webbyTrophyBase', source: '/playful-3d/models/webbyTrophy/base.glb' },
            { name: 'webbyTrophyCollision', source: '/playful-3d/models/webbyTrophy/collision.glb' },

            // Lemon
            { name: 'lemonBase', source: '/playful-3d/models/lemon/base.glb' },
            { name: 'lemonCollision', source: '/playful-3d/models/lemon/collision.glb' },

            // Bownling ball
            { name: 'bowlingBallBase', source: '/playful-3d/models/bowlingBall/base.glb' },
            { name: 'bowlingBallCollision', source: '/playful-3d/models/bowlingBall/collision.glb' },

            // Bownling ball
            { name: 'bowlingPinBase', source: '/playful-3d/models/bowlingPin/base.glb' },
            { name: 'bowlingPinCollision', source: '/playful-3d/models/bowlingPin/collision.glb' },

            // Areas
            { name: 'areaKeyEnter', source: '/playful-3d/models/area/keyEnter.png', type: 'texture' },
            { name: 'areaEnter', source: '/playful-3d/models/area/enter.png', type: 'texture' },
            { name: 'areaOpen', source: '/playful-3d/models/area/open.png', type: 'texture' },
            { name: 'areaReset', source: '/playful-3d/models/area/reset.png', type: 'texture' },
            { name: 'areaQuestionMark', source: '/playful-3d/models/area/questionMark.png', type: 'texture' },

            // Tiles
            { name: 'tilesABase', source: '/playful-3d/models/tiles/a/base.glb' },
            { name: 'tilesACollision', source: '/playful-3d/models/tiles/a/collision.glb' },

            { name: 'tilesBBase', source: '/playful-3d/models/tiles/b/base.glb' },
            { name: 'tilesBCollision', source: '/playful-3d/models/tiles/b/collision.glb' },

            { name: 'tilesCBase', source: '/playful-3d/models/tiles/c/base.glb' },
            { name: 'tilesCCollision', source: '/playful-3d/models/tiles/c/collision.glb' },

            { name: 'tilesDBase', source: '/playful-3d/models/tiles/d/base.glb' },
            { name: 'tilesDCollision', source: '/playful-3d/models/tiles/d/collision.glb' },

            { name: 'tilesEBase', source: '/playful-3d/models/tiles/e/base.glb' },
            { name: 'tilesECollision', source: '/playful-3d/models/tiles/e/collision.glb' },

            // Konami
            { name: 'konamiLabel', source: '/playful-3d/models/konami/label.png', type: 'texture' },
            { name: 'konamiLabelTouch', source: '/playful-3d/models/konami/label-touch.png', type: 'texture' },

            // Wigs
            { name: 'wig1', source: '/playful-3d/models/wigs/wig1.glb' },
            { name: 'wig2', source: '/playful-3d/models/wigs/wig2.glb' },
            { name: 'wig3', source: '/playful-3d/models/wigs/wig3.glb' },
            { name: 'wig4', source: '/playful-3d/models/wigs/wig4.glb' },

            // // Egg
            // { name: 'eggBase', source: '/playful-3d/models/egg/base.glb' },
            // { name: 'eggCollision', source: '/playful-3d/models/egg/collision.glb' },
        ])

        this.loader.on('fileEnd', (_resource, _data) =>
        {
            this.items[_resource.name] = _data

            // Texture
            if(_resource.type === 'texture')
            {
                const texture = new THREE.Texture(_data)
                texture.needsUpdate = true

                this.items[`${_resource.name}Texture`] = texture
            }

            // Trigger progress
            this.trigger('progress', [this.loader.loaded / this.loader.toLoad])
        })

        this.loader.on('end', () =>
        {
            // Trigger ready
            this.trigger('ready')
        })
    }
}

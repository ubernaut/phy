

import {
	Object3D, Group, Mesh, SkinnedMesh, Texture,
    Matrix4, Quaternion, Euler, Vector3, Vector2,
    SphereGeometry, SkeletonHelper,
    MeshStandardMaterial, MeshLambertMaterial, MeshPhongMaterial, MeshBasicMaterial,MeshPhysicalMaterial,
    TextureLoader,AnimationMixer,
    FrontSide, DoubleSide, Color, ShaderChunk, 
    VectorKeyframeTrack, QuaternionKeyframeTrack, AnimationClip, Skeleton, sRGBEncoding,
    Float32BufferAttribute, EquirectangularReflectionMapping, LinearEncoding,AdditiveBlending,
    CustomBlending,
    ZeroFactor,
    SrcAlphaFactor,
} from 'three';
import { Pool } from '../Pool.js';

const setting = {

    metalness:0.6,
    roughness:0.4,
    clearcoat:1.0,
    wireframe:false,
    
}

export const Eva = {

	isBreath:false,
	isEyeMove:false,
	haveMorph:false,

	skeletonRef:'eva_SKIN',

	fullMorph: [],

	haveQuality: false,
	skinRef:'eva_00',
	texturePath: 'assets/textures/eva/',
	textures: ['eva00_c.jpg', 'eva01_c.jpg', 'eva02_c.jpg', 'eva_l.jpg'],

    modelPath: 'assets/models/',
    forceModel:'eva',

    setting:setting,

    materialRef:'eva00',
    materials:{
        eva00:{
            type:'Physical',
            map: 'eva00_c', 
            emissiveMap:'eva_l',
            emissive:0xffffff,
            roughness:setting.roughness,
            metalness:setting.metalness,
            wireframe:setting.wireframe,
            clearcoat:setting.clearcoat,
        },
        eva01:{
            type:'Physical',
            map: 'eva01_c',
            emissiveMap:'eva_l',
            emissive:0xffffff,
            roughness:setting.roughness,
            metalness:setting.metalness,
            wireframe:setting.wireframe,
            clearcoat:setting.clearcoat,
        },
        eva02:{
            type:'Physical',
            map: 'eva02_c', 
            emissiveMap:'eva_l',
            emissive:0xffffff,
            roughness:setting.roughness,
            metalness:setting.metalness,
            wireframe:setting.wireframe,
            clearcoat:setting.clearcoat,
        }
    },

    changeMaterial:( Setting ) => {

        const s = Eva.setting;

        if(Setting){
            for(let o in Setting){
                if( s[o] !== undefined) s[o] = Setting[o]
            }
        }
        
        let m = Pool.getMaterial( 'eva00' );
        m.roughness = s.roughness;
        m.metalness = s.metalness;
        m.wireframe = s.wireframe;
        m.clearcoat = s.clearcoat;
        m = Pool.getMaterial( 'eva01' );
        m.roughness = s.roughness;
        m.metalness = s.metalness;
        m.wireframe = s.wireframe;
        m.clearcoat = s.clearcoat;
        m = Pool.getMaterial( 'eva02' );
        m.roughness = s.roughness;
        m.metalness = s.metalness;
        m.wireframe = s.wireframe;
        m.clearcoat = s.clearcoat;

    },

    applyMaterial:( root, model ) => {

    	const def = Pool.getMaterial( model );

        root.traverse( ( node ) => {

            if ( node.isMesh ){
            	
            	node.material = def;
                node.receiveShadow = true;
                node.castShadow = true;

                switch( node.name ){

                    case 'eva_2_head':case 'eva_2_mach': 
                    node.visible = model === 'eva02' ? true : false
                    break;

                    case 'eva_L_COLLAR':case 'eva_R_COLLAR': 
                    node.visible = model === 'eva00' ? false : true
                    break;

                    case 'eva_HEAD': case 'eva_MACHOIR': 
                    node.visible = model === 'eva01' ? true : false
                    break;

                    case 'eva_0_R_COLLAR':case 'eva_0_L_COLLAR':case 'eva_0_head': case 'eva_0_head2':
                    node.visible = model === 'eva00' ? true : false
                    break;

                    case 'eva_0_CHEST2':
                    node.visible = model === 'eva01' ? false : true
                    break;
                }
            }

        })

    }




}
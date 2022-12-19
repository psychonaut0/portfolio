import { useGLTF } from '@react-three/drei'
import { motion } from "framer-motion-3d"


export function ManModel(props) {

  

  const { nodes, materials } = useGLTF('http://localhost:3000/model.glb')

  

  return (
    <motion.group rotation={[0.07, -1.1, 0.01]} position={[0.2,-0.4,-1]} animate={{rotateY: -1.3}} transition={{duration: 15, repeat: "Infinity", repeatType: "mirror"}} {...props} dispose={null}>
      <mesh geometry={nodes.Wolf3D_Hair.geometry} material={materials['Stone.002']} position={[0.29, -2.49, 0.53]} rotation={[-0.05, 0.08, 0.1]} scale={1.73} />
      <mesh geometry={nodes.Wolf3D_Glasses.geometry} material={materials['Stone.002']} position={[0.29, -2.49, 0.53]} rotation={[-0.05, 0.08, 0.1]} scale={1.73} />
      <mesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials['Stone.002']} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} position={[0.29, -2.49, 0.53]} rotation={[-0.05, 0.08, 0.1]} scale={1.73} />
      <mesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials['Stone.002']} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} position={[0.29, -2.49, 0.53]} rotation={[-0.05, 0.08, 0.1]} scale={1.73} />
      <mesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials['Stone.002']} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} position={[0.29, -2.49, 0.53]} rotation={[-0.05, 0.08, 0.1]} scale={1.73} />
      <mesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials['Stone.002']} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} position={[0.29, -2.49, 0.53]} rotation={[-0.05, 0.08, 0.1]} scale={1.73} />
      <mesh name="Wolf3D_Beard" geometry={nodes.Wolf3D_Beard.geometry} material={materials['Stone.002']} morphTargetDictionary={nodes.Wolf3D_Beard.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Beard.morphTargetInfluences} position={[0.29, -2.49, 0.53]} rotation={[-0.05, 0.08, 0.1]} scale={1.73} />
    </motion.group>
  )
}

useGLTF.preload('http://localhost:3000/model.glb')
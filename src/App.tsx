import "./styles.css";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";

const Model = () => {
  let gltf = useLoader(GLTFLoader, "output.gltf");
  const wut = useGLTF("output.gltf");
  // let _ = require("lodash");
  // const nodes = wut?.nodes;
  const [nodes, setNodes] = React.useState({});
  const gltfArray = Object.entries(gltf);
  // const tt = _.groupBy(gltf?.nodes, "Mesh");

  const temp = gltf.scene.children[0].children[0].children.filter((item) => {
    return item.type === "LineSegments";
  });

  const temp2 = gltf.scene.children[0].children[0].children.filter((item) => {
    return item.type === "Mesh";
  });

  gltf?.scene?.children[0].children[0].children?.map((item) => {
    if (item.type === "Mesh" && item.id < 2000) {
      // @ts-ignore
      // item.material.color.isColor = false;
      item.visible = false;
      // item.material.opacity = 0;
      // console.log(item);
    }
    // console.log("item", item.material);
    // if (item.type === "Mesh") {
    //   return (item.material.opacity = 0);
    // }
  });

  // gltf.scene.children[0].children[0].children = temp2;

  React.useEffect(() => {
    setNodes(gltf?.nodes);
    // setNodes(gltf?.nodes);
  }, []);

  console.log("GG", gltf);

  // console.log("wit", temp);

  return (
    <>
      <primitive object={gltf.scene} scale={0.55} position={[0, -30, 0]} />
    </>
  );
};

export default function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <Model />
          <OrbitControls />
          <Environment preset="park" background />
        </Suspense>
      </Canvas>
    </div>
  );
}

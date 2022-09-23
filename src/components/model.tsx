import React from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import { motion, useScroll } from "framer-motion";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 100vw;
  height: 200px;
  overflow-y: scroll;
`;

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  height: 80vh;
  width: 100%;
`;

export default function Model() {
  let gltf = useLoader(GLTFLoader, "output.gltf");
  const wut = useGLTF("output.gltf");
  const { scrollY, scrollYProgress } = useScroll();
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

  console.log("GLTF", gltf);
  React.useEffect(() => {
    return scrollY.onChange((latest) => {
      //   console.log("Page scroll: ", latest);
      gltf?.scene?.children[0].children[0].children?.map((item) => {
        // console.log("ITEM", item);
        if (item.type === "Mesh" && item.id < latest * 2) {
          // @ts-ignore
          // item.material.color.isColor = false;
          return (
            // // @ts-ignore
            // (item.material.color.r = 1),
            // // @ts-ignore
            // (item.material.color.g = 0),
            // // @ts-ignore
            // (item.material.color.b = 0),
            (item.visible = false), gltf.scene.rotateY(0.00001)
            // gltf.scene.rotateX(-0.00001)
            // gltf.scene.rotateZ(0.00001)
          );

          // item.material.opacity = 0;
          // console.log(item);
        } else {
          return (item.visible = true);

          //   gltf.scene.rotateY(0.000001);
        }
        // console.log("item", item.material);
        // if (item.type === "Mesh") {
        //   return (item.material.opacity = 0);
        // }
      });
    });
  }, []);

  //   gltf?.scene?.children[0].children[0].children?.map((item) => {
  //     if (item.type === "Mesh" && item.id < 2000) {
  //       // @ts-ignore
  //       // item.material.color.isColor = false;
  //       item.visible = false;
  //       // item.material.opacity = 0;
  //       // console.log(item);
  //     }
  //     // console.log("item", item.material);
  //     // if (item.type === "Mesh") {
  //     //   return (item.material.opacity = 0);
  //     // }
  //   });

  //   const getScroll = () => {
  //     return scrollY.onChange((latest) => {
  //       console.log("Page scroll: ", latest);
  //     });
  //   };

  // const CameraController = () => {
  //   const { camera, gl } = useThree();
  //   React.useEffect(() => {
  //     // @ts-ignore
  //     const controls = new OrbitControls(camera, gl.React.domElement);

  //     // controls.minDistance = 3;
  //     // controls.maxDistance = 20;
  //     return () => {
  //       controls.dispose();
  //     };
  //   }, [camera, gl]);
  //   return null;
  // };
  return (
    <StyledWrapper>
      <Canvas camera={{ fov: 20, position: [1, 0, 40] }}>
        {/* <CameraController /> */}
        {/* <StyledSuspense fallback={null}> */}
        {/* <Model /> */}
        {/* <StyledDiv> */}
        <Suspense fallback={null}>
          <primitive object={gltf.scene} scale={0.28} position={[0, -20, 0]} />
          {/* </StyledDiv> */}
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>

        {/* </StyledSuspense> */}
      </Canvas>
    </StyledWrapper>
  );
}

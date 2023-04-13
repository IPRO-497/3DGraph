import { Edges } from "@react-three/drei"
import { useControls } from "leva"

export const ContributionGraph = ({ data }) => {
  const controls = useControls("bar", {
    BarColor: "black",
    EdgeColor: "#525466"
  })
  return (
    data.map(
      (week, key) => 
      <group position={[key / 2, 0, 0]} key={key}>
        {week.map((day, dayKey) => {
          if(day){
            return <mesh position={[0, day / 20, dayKey / 2]} key={dayKey}>
              <boxGeometry args={[0.5, day/10, 0.5]}/>
              <meshBasicMaterial color={"black"} toneMapped={ false } />
              <Edges 
                color={"#525466"}
              />
            </mesh>
          }else return null
        })}
      </group>
    )
  )
}

// Light Mode #40414f black
// Dark mode black #40414f
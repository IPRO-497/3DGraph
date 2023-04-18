import { Edges } from "@react-three/drei"
import { button, useControls } from "leva"

export const ContributionGraph = ({ data }) => {
  const [controls, set] = useControls("bar", () => ({
    BarColor: "black",
    EdgeColor: "#525466",
    "Reset Values": button(
      () => {
       set({BarColor: "black", EdgeColor: "#525466"})
      }
    )
  }),{
    collapsed : true,
    order: 2
  })
  return (
    data.map(
      (week, key) => 
      <group position={[key / 2, 0, 0]} key={key}>
        {week.map((day, dayKey) => {
          if(day){
            return <mesh position={[0, day / 20, dayKey / 2]} key={dayKey}>
              <boxGeometry args={[0.5, day/10, 0.5]}/>
              <meshBasicMaterial color={controls.BarColor} toneMapped={ false } />
              <Edges 
                color={controls.EdgeColor}
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
export const ContributionGraph = ({ data }) => {
  return (
    data.map(
      (week, key) => 
      <group position={[key / 2, 0, 0]} key={key}>
        {week.map((day, dayKey) => {
          if(day){
            return <mesh position={[0, day / 20, dayKey / 2]} key={dayKey}>
              <boxGeometry args={[0.5, day/10, 0.5]}/>
              <meshBasicMaterial color="black" />
            </mesh>
          }else return null
        })}
      </group>
    )
  )
}
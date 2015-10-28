#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68589.json >files/school.json
#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/68590.json >files/buildings.json
#curl -X GET -u "wbsida321:KrS93r8Ttei63xN4ZB6rt0xLy" https://api.ona.io/api/v1/data/80364.json >files/building_elements.json

mkdir output_school
mkdir output_buildings
mkdir output_building_elements


node index.js school.json school_label.json school
node index.js buildings.json building_label.json buildings
node index.js building_elements.json building_elements_label.json building_elements

echo "All Done"

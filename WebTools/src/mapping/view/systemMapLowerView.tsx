import React from "react";
import { Color } from "../../common/colour";
import { CompanionType, StarSystem } from "../table/starSystem";
import { AsteroidBeltDetails, StandardWorldDetails, WorldClass } from "../table/world";

interface ISystemMapLowerViewProperties {
    system: StarSystem;
}

class SystemMapLowerView extends React.Component<ISystemMapLowerViewProperties, {}> {

    static START_X = 90;
    static DISPLAY_WIDTH = 970 - SystemMapLowerView.START_X;

    render() {
        const { system } = this.props;
        const purple = "#906F9A";

        let r = Math.max(2, Math.sqrt(system.star?.spectralClass?.radius?.midpoint * 200));
        const offset = 35 + (1.5 * r);

        let star2 = null;
        let companionGradient = null;
        if (system.companionStar) {
            if (system.companionType === CompanionType.Close) {
                let r2 = Math.max(2, Math.sqrt(system.companionStar?.spectralClass?.radius?.midpoint * 200));
                star2 = (<g>
                    <circle cx={35 + r} cy="110px" r={r2} fill="url(#companionStarRadialGradient)" stroke="black" strokeWidth={0.5} />
                    <text x={35 + r} y={110 + Math.max(r2, r) + 20} fontSize={16} fontFamily="lcars" fill="white" textAnchor="middle">{system.companionStar?.designation?.toLocaleUpperCase()}</text>
                    <text x={35 + r} y={110 + Math.max(r2, r) + 36} fontSize={16} fontFamily="lcars" fill="white" textAnchor="middle">{system.companionStar?.spectralClass?.colourDescription?.toLocaleUpperCase()}</text>
                </g>)
                companionGradient = (<radialGradient id="companionStarRadialGradient" xlinkHref="#companionStarLinearGradient"
                cx={35+r-(0.4*r2)} cy={110-(0.4*r2)} fx={35+r-(0.4*r2)} fy={110-(0.4*r2)}  r={r2}
                gradientUnits="userSpaceOnUse" />);
            }
        }

        let orbits = system.worlds?.map(w => w.orbitalRadius) ?? [];
        if (system.gardenZoneInnerRadius) {
            orbits.push(system.gardenZoneInnerRadius);
        }
        if (system.gardenZoneOuterRadius) {
            orbits.push(system.gardenZoneOuterRadius);
        }
        orbits = orbits.sort((a, b) => {
            if (a === b) {
                return 0;
            } else {
                return a < b ? -1 : 1;
            }
        });

        let maxWorldDiameter = 50000;
        system.worlds?.filter(w => w.diameter != null).forEach(w => maxWorldDiameter = Math.max(w.diameter, maxWorldDiameter));
        let smallWorldDiameter = 5000;
        system.worlds?.filter(w => w.diameter != null).forEach(w => smallWorldDiameter = Math.min(w.diameter, smallWorldDiameter));
        let factor = 18 / Math.sqrt(maxWorldDiameter / 1000 - smallWorldDiameter / 1000);

        let worldGradients = system.worlds?.map((w, i) =>{
            let r = Math.max(2, w.diameter == null ? 10 : (Math.sqrt(w.diameter / 1000 - smallWorldDiameter / 1000) * factor));
            let orbitalX = this.calculateOrbitX(w.orbitalRadius, orbits);

            return (<radialGradient id={'worldRadialGradient' + i} xlinkHref="#worldLinearGradient"
                cx={orbitalX-(0.4*r)} cy={110-(0.4*r)} fx={orbitalX-(0.4*r)} fy={110-(0.4*r)}  r={r}
                gradientUnits="userSpaceOnUse" />)
        });

        let worlds = system.worlds?.map((w, i) => {
            let r = Math.max(2, w.diameter == null ? 10 : (Math.sqrt(w.diameter / 1000 - smallWorldDiameter / 1000) * factor));
            let orbitalX = this.calculateOrbitX(w.orbitalRadius, orbits);
            let prevOrbitalX = (i === 0) ? 0 : (this.calculateOrbitX(system.worlds[i-1].orbitalRadius, orbits) + 2);
            let auWidth = (orbitalX - 2) - (prevOrbitalX);

            let axis = null;
            if (w.worldDetails instanceof StandardWorldDetails) {
                let details = w.worldDetails as StandardWorldDetails;
                axis = (<path d={'M ' + orbitalX.toFixed(2) + "," + (110-r-4).toFixed(2) + " L " + orbitalX.toFixed(2) + "," + (110-r-1).toFixed(2)
                    + " M " + orbitalX.toFixed(2) + "," + (110+r+1).toFixed(2) + " L " + orbitalX.toFixed(2) + "," + (110+r+4).toFixed(2)} stroke="white" strokeWidth={0.5}
                transform={'rotate(' + details.axialTilt + ',' + orbitalX.toFixed(2) + ',110)'}/>)
            }

            if (w.worldClass.id === WorldClass.AsteroidBelt) {
                let details = w.worldDetails as AsteroidBeltDetails;

                let beltWidth = details.depth;
                let beltStart = w.orbitalRadius - beltWidth * 0.5;
                let beltStartMidway = w.orbitalRadius - beltWidth * 0.25;
                let beltEnd = w.orbitalRadius + beltWidth * 0.5;
                let beltEndMidway = w.orbitalRadius + beltWidth * 0.25;


                return (<g key={'world-' + i}>
                    <circle cx={this.calculateOrbitX(beltStart, orbits)} cy="108px" r={1} fill={purple} />
                    <circle cx={this.calculateOrbitX(beltStartMidway, orbits)} cy="112px" r={1} fill={purple} />
                    <circle cx={orbitalX} cy="111px" r={1.5} fill={purple} />
                    <circle cx={this.calculateOrbitX(beltEndMidway, orbits)} cy="114px" r={1} fill={purple} />
                    <circle cx={this.calculateOrbitX(beltEnd, orbits)} cy="110px" r={1} fill={purple} />
                    <text x={orbitalX} y={i % 2 === 1 ? 110 + r + 20 : (110 - r - 12)} fontSize={16} fontFamily="lcars" fill="white" textAnchor="middle">{w.worldClass.description}</text>
                    {auWidth > 0 ? (
                            <rect x={prevOrbitalX.toFixed(2)} y={0} height={20} width={auWidth.toFixed(2)} fill="#F9AC76" />
                    ) : null }
                    {auWidth > 30 ? (<text x={(orbitalX - 6)} y={15} fontSize={14} fontFamily="lcars" fill="black" textAnchor="end">{w.orbitalRadius.toFixed(2) + ' AU'}</text>) : null}
                </g>)
            } else {

                return (<g key={'world-' + i}>
                        <circle cx={orbitalX} cy="110px" r={r} fill={"url(#worldRadialGradient" + i + ")"} />
                        {axis}
                        <text x={orbitalX} y={i % 2 === 1 ? 110 + r + 20 : (110 - r - 26)} fontSize={16} fontFamily="lcars" fill="white" textAnchor="middle">{'CLASS ' + WorldClass[w.worldClass.id]}</text>
                        <text x={orbitalX} y={i % 2 === 1 ? 110 + r + 36 : (110 - r - 12)} fontSize={14} fontFamily="lcars" fill="white" textAnchor="middle">{w.worldClass.description}</text>
                        {auWidth > 0 ? (
                            <rect x={prevOrbitalX.toFixed(2)} y={0} height={20} width={auWidth.toFixed(2)} fill="#F9AC76" />
                        ) : null }
                        {auWidth >= 35 ? (<text x={(orbitalX - 6)} y={15} fontSize={14} fontFamily="lcars" fill="black" textAnchor="end">{w.orbitalRadius.toFixed(2) + ' AU'}</text>) : null}
                </g>);
            }
        });

        const starColour = system.star.spectralClass.colour.blend(new Color(255, 255, 255), 0.5);
        const darkerStarColour = system.star.spectralClass.colour.blend(new Color(0, 0, 0), 0.4);
        const worldColour = Color.from(purple).blend(new Color(255, 255, 255), 0.5);
        const darkerWorldColour = Color.from(purple).blend(new Color(0, 0, 0), 0.2);
        const companionColour = system.companionStar ? system.companionStar.spectralClass.colour.blend(new Color(255, 255, 255), 0.5) : null;
        const darkerCompanionColour = system.companionStar ? system.companionStar.spectralClass.colour.blend(new Color(0, 0, 0), 0.5) : null;

        return (<div className="starSystemLowerView">
                <svg viewBox="0 0 1110 230" xmlns="<http://www.w3.org/2000/svg>">
                    <defs>
                        <linearGradient id="primaryStarLinearGradient">
                            <stop stopColor={starColour.asHex()} offset={0} />
                            <stop stopColor={darkerStarColour.asHex()} offset={1} />
                        </linearGradient>
                        {companionColour ? (<linearGradient id="companionStarLinearGradient">
                            <stop stopColor={companionColour.asHex()} offset={0} />
                            <stop stopColor={darkerCompanionColour.asHex()} offset={1} />
                        </linearGradient>) : null}
                        <linearGradient id="worldLinearGradient">
                            <stop stopColor={worldColour.asHex()} offset={0} />
                            <stop stopColor={darkerWorldColour.asHex()} offset={1} />
                        </linearGradient>
                        <radialGradient id="primaryStarRadialGradient" xlinkHref="#primaryStarLinearGradient"
                            cx={35-(0.4*r)} cy={110-(0.4*r)} fx={35-(0.4*r)} fy={110-(0.4*r)}  r={r}
                            gradientUnits="userSpaceOnUse" />
                        {companionGradient}
                        {worldGradients}
                    </defs>

                    <path d="m 1025,80 v 96.71484 c 0.2996,18.56303 -4.3922,22.90266 -19.0273,23.28516 H 975 v 30 h 89.5605 c 32.0849,0.3825 45.7564,-14.25583 45.4395,-45 V 80 Z" fill="#F9AC76" />
                    <path d="m 1025,30 v 40 h 85 V 30 Z" fill="#9999FF" />
                    <path d="M 15 200 A 15 15 0 0 0 0 215 A 15 15 0 0 0 15 230 L 15 200 z " fill="#F9AC76" />
                    <circle cx="35px" cy="110px" r={r} fill="url(#primaryStarRadialGradient)" />
                    {system?.star?.spectralClass?.isDwarf
                    ? (<text x="35px" y={110 - r - 12} fontSize={14} fontFamily="lcars" fill="white" textAnchor="middle">{system.star?.designation}</text>)
                    : (<>
                        <text x="35px" y={110 - r - 26} fontSize={16} fontFamily="lcars" fill="white" textAnchor="middle">{system.star?.designation?.toLocaleUpperCase()}</text>
                        <text x="35px" y={110 - r - 12} fontSize={14} fontFamily="lcars" fill="white" textAnchor="middle">{system.star?.spectralClass?.colourDescription?.toLocaleUpperCase()}</text>
                    </>)}
                    {star2}
                    {worlds}
                    {this.renderTrackers(orbits, offset)}
                </svg>
            </div>);
    }

    renderTrackers(orbits: number[], offset: number) {
        if (orbits?.length) {
            const { system } = this.props;
            let inner = this.calculateOrbitX(system.gardenZoneInnerRadius, orbits);
            let outer = this.calculateOrbitX(system.gardenZoneOuterRadius, orbits);

            let ecoWidth = (outer-2) - (inner+2);

            let lastAuMarker = system.worlds ? this.calculateOrbitX((system.worlds[system.worlds.length - 1]).orbitalRadius, orbits) : null;

            return (<g>
                <rect x={15} y={200} height={30} width={(inner - 2 - 15).toFixed(2)} fill="#F9AC76" />
                <rect x={(inner + 2).toFixed(2)} y={200} height={30} width={ecoWidth.toFixed(2)} fill="#f7bbdd" />
                <rect x={(outer + 2).toFixed(2)} y={200} height={30} width={((1050-2) - (outer+2)).toFixed(2)} fill="#F9AC76" />
                <text x={(inner - 6)} y={221} fontSize={16} fontFamily="lcars" fill="black" textAnchor="end">INNER ZONE</text>
                {ecoWidth >= 54 ?
                    (<text x={(inner + 2 + (ecoWidth / 2)).toFixed(2)} y={221} fontSize={16} fontFamily="lcars" fill="black" textAnchor="middle">ECOSPHERE</text>) : null}
                <text x={(outer + 6)} y={221} fontSize={16} fontFamily="lcars" fill="black" textAnchor="start">OUTER ZONE</text>

                {lastAuMarker ? (<rect x={(lastAuMarker + 2).toFixed(2)} y={0} height={20} width={(1110 - (lastAuMarker+2)).toFixed(2)} fill="#F9AC76" />) : null}
            </g>);
        } else {
            return (<g>
                <rect x={0} y={0} height={20} width={1110} fill="#F9AC76" />
                <rect x={15} y={200} height={30} width={1050} fill="#F9AC76" />
            </g>);
        }
    }

    calculateOrbitX(orbitInAus: number, orbits: number[]) {
        if (orbits?.length) {
            let firstOrbitInAus = orbits[0];
            let firstOrbit = Math.log1p(firstOrbitInAus);
            let lastOrbit = Math.log1p(orbits[orbits.length - 1]);

            return SystemMapLowerView.START_X + (SystemMapLowerView.DISPLAY_WIDTH) / (lastOrbit - firstOrbit) * (Math.log1p(orbitInAus) - firstOrbit);
        } else {
            return 0;
        }
    }
}

export default SystemMapLowerView;
import { Species } from "../../helpers/speciesEnum";
import { KlingonForehead1, KlingonForehead2, KlingonForehead3 } from "./speciesOptionCatalog";
import { SpeciesOption } from "./speciesOptionEnum";
import SpeciesRestrictions from "./speciesRestrictions";
import { Token } from "./token";

const AndorianAntennaBack = `<g>
    <path d="m 337.97639,78.768141 c 0.68533,-1.314667 2.70533,-11.932 3.572,-16.897333 0.86667,-4.965333 1.97067,-14.424 1.34,-16.867999 -0.63067,-2.444 -1.49733,-15.134667 -1.576,-16.948 -0.08,-1.813333 0,-11.745333 -0.15867,-13.716 -0.15733,-1.970666 -3.78266,-0.236 -5.912,4.808 -2.128,5.045333 -2.364,17.421333 -2.04933,20.968 0.316,3.548 -1.65467,7.094666 -2.52267,10.247999 -0.752,2.736 -3.228,5.325334 -4.932,7.505334 -1.00666,1.286666 -2.03466,2.555999 -3.06,3.826666 -0.17466,0.216 -1.544,1.577333 -1.448,1.88 0.24667,-0.0053 3.4,-0.138667 3.35867,-0.273333 0.0227,0.07467 0,0.14 0.024,0.213333 0.54267,0.03467 1.1,-0.0093 1.644,0.024 -0.0173,0.526667 -0.312,0.993333 -0.22533,1.534667 0.64533,-0.141334 1.44266,-0.072 2.10666,-0.03733 0.0133,1.248 0.612,1.033334 1.65334,0.786667 -0.0333,0.429333 -0.22934,0.861333 -0.30934,1.3 0.428,-0.384 1.18267,-0.508 1.728,-0.593333 0.0587,0.588 -0.0947,1.196 -0.0507,1.8 0.27866,-0.186667 0.648,-0.388 0.912,-0.614667 0.37866,0.889333 -0.0147,2.121333 -0.0533,3.034667 0.636,-0.08 1.24934,-0.229334 1.868,-0.353334 0.624,0.712 -0.37066,1.412 -0.204,2.057333 0.19734,0.772 1.13867,0.064 1.564,0.449334 0.348,0.316 -0.096,1.017333 0.172,1.482666 0.22,0.38 0.96267,0.828 1.38934,0.981334 -0.0507,0.378666 -0.36934,0.693333 -0.38267,1.088 -0.0147,0.458666 1.42933,2.537333 1.552,2.313333" style="fill:#cd976d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4021"/>
    <path d="m 325.73746,57.868542 c -1.396,1.786667 -2.804,3.953333 -4.684,5.264 -0.54533,0.38 -0.876,0.488 -1.35733,1.008 -0.62667,0.674666 -1.736,0.733333 -2.26134,1.341333 0.68134,0.102667 0.97734,0.585333 1.42134,1.070667 0.636,0.696 1.16,0.673333 2.07866,0.444 0.74667,-0.188 1.46267,-0.261334 2.128,-0.553334 0.78267,-0.342666 1.368,-0.26 2.22934,-0.314666 1.14933,-0.07333 1.20933,-0.661334 2.052,-1.204 0.64266,-0.414667 1.72266,-0.210667 2.128,-1.024 0.13466,-0.270667 -0.036,-0.728 0.13066,-0.968 0.26,-0.374667 0.77067,-0.262667 1.1,-0.550667 0.31867,-0.278666 0.28134,-0.646666 0.47734,-0.982666 0.15733,-0.273334 0.464,-0.393334 0.588,-0.676 0.14,-0.322667 -0.028,-0.568 0.18266,-0.881334 0.18267,-0.272 0.58134,-0.153333 0.69334,-0.566666 0.0973,-0.356 -0.368,-0.670667 -0.228,-1.088 0.196,-0.586667 1.09066,-0.816 1.39733,-1.338667 -0.58133,-0.416 0.0213,-1.008 0.172,-1.437333 0.27067,-0.773334 -0.0693,-1.522667 -0.007,-2.289334 0.0453,-0.550666 0.38267,-0.996 0.456,-1.496 0.088,-0.605333 0.18667,-0.942666 0.17067,-1.542666 -0.008,-0.250667 -0.18133,-0.638667 -0.0573,-0.904 0.10533,-0.224 0.43466,-0.268 0.53866,-0.452 0.252,-0.448 0.0227,-0.986667 0.20134,-1.477333 0.10133,-0.284 0.48533,-0.482667 0.512,-0.793334 0.0227,-0.256 -0.25734,-0.422666 -0.32134,-0.661333 -0.156,-0.577333 0.104,-1.013333 0.084,-1.504 -0.0213,-0.541333 -0.29733,-0.746667 -0.0867,-1.337333 0.17866,-0.502667 0.33066,-0.457334 0.3,-1.085334 -0.028,-0.584 0.0947,-1.001333 0.17333,-1.497333 0.064,-0.402667 -0.056,-0.812 -0.13867,-1.364 -0.088,-0.593333 -0.032,-0.838667 0.13734,-1.382666 0.17466,-0.557334 0.19466,-0.865334 0.16133,-1.528 -0.06,-1.168 0.38,-2.129334 0.16133,-3.298667 -0.0693,-0.370667 -0.34266,-0.697333 -0.45733,-1.057333 -0.232,-0.732 -0.0293,-0.545334 0.24,-1.141334 0.37867,-0.836 0.544,-1.754666 1.09333,-2.530666 0.43734,0.09733 0.908,0.758666 1.37334,1.004 0.49333,0.26 0.98666,0.452 1.536,0.545333 0.17333,0.02933 0.97866,0.18 1.10266,0.133333 0.61067,-0.228 0.108,-6.905333 0.10667,-7.634666 -0.008,-2.58 0.0947,-5.202667 -0.112,-7.777333 -0.15733,-1.970667 -3.78267,-0.236 -5.912,4.808 -2.128,5.045333 -2.364,17.421333 -2.04933,20.967999 0.316,3.546667 -1.65467,7.094667 -2.52267,10.248 -0.752,2.736 -3.228,5.325333 -4.932,7.505333" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4031"/>
    <path d="m 321.23599,63.598542 c 0,0 12.036,-14.338666 11.24667,-25.926666 -0.60667,-8.933333 2.09333,-19.061333 3.13866,-23.769333 1.04667,-4.709333 5.75467,-9.6786662 7.324,-6.0159996 1.56934,3.6613336 0.524,10.4613326 -0.26133,13.8626666 -0.62,2.689333 -0.348,5.730666 -0.26267,8.46 0.112,3.566666 0.19867,7.269333 0.90267,10.758666 1.35867,6.724 1.364,13.682666 0.552,20.474666 -0.73067,6.108 -1.38133,13.216 -6.50533,17.341333 1.56133,-1.256 1.56266,-5.382667 1.864,-7.22 0.52666,-3.208 1.012,-6.421333 1.436,-9.644 0.74666,-5.681333 1.86133,-11.951999 0.96666,-17.677333 -1.308,-8.369333 -1.77333,-22.954666 -1.04533,-26.939999 0.72667,-3.986666 -2.09333,-7.585333 -2.87733,-4.708 -0.78534,2.877334 -4.52267,13.489333 -3.73334,25.077333 0.324,4.761333 -0.452,15.988 -12.74533,25.926666" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4041"/>
    <path d="m 340.27186,5.8404099 c -0.0467,0.032 -0.0933,0.065333 -0.14,0.1 -1.468,1.084 -2.01467,2.8093333 -2.67467,4.4360001 -0.74933,1.848 -0.824,3.948 -0.76,5.913333 0.11467,3.561333 1.60534,7 4.196,8.996 1.064,0.818666 2.26534,1.906666 3.43334,0.890666 1.14133,-0.993333 1.83866,-2.456 2.224,-3.912 0.788,-2.975999 1.33066,-6.055999 1.26933,-9.142666 -0.0507,-2.570667 -0.408,-5.9399998 -2.33733,-7.8519998 -0.76534,-0.7586666 -1.616,-0.8493333 -2.63467,-0.5733333 -0.912,0.2466667 -1.80267,0.6053333 -2.576,1.144" style="fill:#cd976d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4045"/>
    <path d="m 344.81426,19.538276 c 0.77867,-2.008 1.132,-3.942667 0.90133,-6.081333 -0.176,-1.628 0.0613,-3.7093334 -1.23466,-4.9933334 -1.456,-1.444 -3.88,0.3893333 -4.69067,1.6786664 -1.11333,1.770667 -1.43733,3.873333 -1.37067,5.924 0.072,2.236 1.024,4.213333 2.304,5.945333 2.256,3.053334 3.408,-0.712 4.09067,-2.473333" style="opacity:0.5;fill:#c14242;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4055"/>
    <path d="m 344.48066,8.4629431 c -1.456,-1.444 -3.88,0.3893333 -4.69067,1.6799999 -1.11333,1.770667 -1.43733,3.872 -1.37066,5.924 0.076,2.361333 1.048,4.292 2.63333,5.985333 0.33867,0.361333 0.72533,0.868 1.07333,1.142667 -0.548,-0.769334 -0.74666,-1.728 -0.91333,-2.622667 -0.416,-2.230666 -0.78933,-5.093333 0.10667,-7.256 0.30666,-0.741333 0.964,-1.653333 1.80666,-1.833333 1.14134,-0.245333 1.972,2.332 2.032,3.161333 0.15734,-0.717333 0.27467,-1.444 0.352,-2.174666 0.14534,-1.386667 0.024,-2.9626669 -1.02933,-4.0066669" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4071"/>
    <path d="m 340.47506,6.8446765 c -0.0427,0.029333 -0.084,0.058667 -0.12533,0.089333 -1.31734,0.972 -1.808,2.52 -2.4,3.9786665 -0.672,1.656 -0.74,3.54 -0.68267,5.302667 0.104,3.193333 1.44133,6.277333 3.76533,8.066666 0.95467,0.734667 2.03334,1.710667 3.08134,0.8 1.024,-0.890666 1.64933,-2.204 1.996,-3.509333 0.70666,-2.668 1.19333,-5.429333 1.13866,-8.198666 -0.0453,-2.305334 -0.36666,-5.3266672 -2.09733,-7.0413338 -0.688,-0.6813333 -1.44933,-0.7613333 -2.36533,-0.5133333 -0.81734,0.22 -1.616,0.5426666 -2.31067,1.0253333 m 4.20667,-3.9559999 c 0.128,0.061333 0.252,0.136 0.37066,0.216 1.04267,0.6973333 1.79867,1.7639999 2.3,2.9133333 2.24267,5.1386664 1.168,11.3733334 -0.36,16.5453334 -0.48,1.625333 -1.34666,3.26 -2.76666,4.369333 -1.452,1.133333 -2.948,-0.08133 -4.27067,-0.996 -3.224,-2.228 -5.07867,-6.066666 -5.22133,-10.044 -0.0867,-2.409333 0.0907,-4.8 1.08933,-6.9199999 0.724,-1.5373332 1.632,-3.8506665 3.172,-4.7506665 1.288,-0.7533333 2.916,-1.2373333 4.38267,-1.4533333 0.31066,-0.046667 0.63066,-0.08 0.93733,-0.010667 0.12667,0.028 0.24933,0.073333 0.36667,0.1306667" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4081"/>
</g>`;

const AndorianAntennaFront = `<g>
    <path d="m 256.67293,48.147342 c 2.04,3.436 4.42133,6.670667 7.08933,9.646667 1.12267,1.252 2.296,2.458666 3.52133,3.610666 0.48934,0.46 0.988,0.912 1.49334,1.354667 0.26266,0.229333 0.452,0.525333 0.71333,0.746666 0.264,0.225334 1.13733,0.830667 1.48667,0.822667 -0.44,0.01067 -0.89867,-0.008 -1.29734,-0.08933 -0.48133,-0.09733 -0.87333,0.07867 -1.316,0.05067 -0.568,-0.036 -1.12133,-0.382666 -1.652,-0.561333 -0.54,-0.181333 -0.91333,-0.656 -1.504,-0.794667 -0.19466,-0.478666 -1.20666,-0.730666 -1.63333,-1.029333 -0.0107,0.406667 0.184,0.766667 0.372,1.096 -1.11067,-0.301333 -1.8,-1.464 -2.80533,-1.862667 -0.21334,0.588 0.33333,1.028 0.31866,1.597334 -1.492,-0.161334 -2.43066,-1.849334 -3.652,-2.464 -0.74666,0.725333 0.74,1.826666 0.84,2.472 -0.66666,-0.409334 -1.36266,-0.913334 -2.084,-1.165334 -0.38,0.816 0.352,1.353334 0.31867,2.132 -0.90933,-0.718666 -2.03467,-1.288 -2.92133,-1.872 0.009,0.609334 0.69333,1.172 0.93466,1.670667 0.244,0.5 0.376,1.148 0.548,1.656 -0.48533,-0.378667 -1.06666,-0.702667 -1.68,-0.772 -0.44,0.710667 0.0267,1.798667 0.11467,2.529333 -1.028,-0.210666 -0.21733,2.089334 -0.2,2.552 -0.48267,-0.02 -3.46133,-0.88 -3.49467,-1.38 0.0187,0.274667 0.08,0.549334 0.14134,0.805334 0.06,0.245333 0.308,0.532 0.228,0.774666 -0.20534,-0.084 -0.428,-0.221333 -0.62267,-0.317333 -0.264,-0.130667 -0.43067,-0.406667 -0.67867,-0.556 -0.0413,0.769333 0.0813,1.582667 -0.068,2.330667 -0.1,-0.185334 -0.036,-0.565334 -0.0627,-0.785334 -0.0293,-0.234666 -0.0613,-0.468 -0.0947,-0.702666 -0.56933,-3.966667 -1.708,-7.861334 -3.28533,-11.542667 -3.13067,-7.306666 -4.668,-24.435999 -0.24534,-36.467999 4.424,-12.0319996 7.95334,-18.6159994 9.54534,-17.3773328 1.59333,1.2386667 4.91066,4.5266666 3.672,6.1186668 -1.23867,1.593333 -3.34534,10.198666 -4.81334,17.214666 -0.708,5.662667 0.71067,17.085333 2.77334,20.558666" style="fill:#cd976d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path23605"/>
    <path d="m 249.45933,46.616409 c 0,0.352 -0.79867,0.761333 -0.84934,1.289333 -0.11333,1.197333 0.89734,1.817333 0.72667,3.108 0.352,0.272 0.116,0.164 0.348,0.524 0.096,0.01867 0.19067,0.03867 0.28667,0.05733 1.84,0.369334 1.03333,3.945334 0.99066,5.168 -0.052,1.528 0.82267,2.310667 1.496,3.534667 0.77067,1.404 0.968,1.485333 2.30534,2.466666 1.132,0.830667 1.12533,1.101334 2.57333,1.4 1.64933,0.341334 3.38933,0.690667 5.156,0.777334 1.60933,0.07867 3.98533,-0.238667 5.46667,0.317333 2.10266,0.789333 -0.21334,2.082667 -0.904,2.772 -1.364,1.361333 -1.512,3.296 -0.10267,4.74 -0.736,0.401333 -1.54133,-0.137333 -2.35067,0.210667 -0.54666,0.234666 -1.27333,1.225333 -1.51333,1.653333 -0.092,0 -0.22133,0.05333 -0.284,0.114666 -0.72,-1.121333 -1.572,-2.098666 -2.22,-3.269333 -0.48267,-0.873333 -0.892,-2.221333 -1.78267,-2.770666 -1.77466,-1.096 -4.35866,0.872 -5.46,2.109333 -0.51333,0.577333 -1.124,1.564 -1.02666,2.433333 0.18266,-0.06 0.43066,-0.02533 0.62,-0.14 -0.0907,0.478667 -0.69467,0.961333 -0.92,1.437333 -0.20934,0.444 -0.492,1.018667 -0.49734,1.501334 0.17334,-0.07333 0.428,-0.03333 0.616,-0.118667 0.124,1.856 -1.51466,3.808 -2.288,5.398667 0.19867,-0.410667 -0.24133,-1.770667 -0.33466,-2.221334 -0.13734,-0.673333 -0.23734,-1.129333 -0.096,-1.837333 -0.3,-0.02667 -0.58534,0.08533 -0.85334,0.218667 -0.009,-0.04533 -0.0173,-0.092 -0.0267,-0.137334 -0.0533,-0.01333 -0.17067,0.0093 -0.21467,-0.02533 -0.20133,-1.406667 0.90133,-2.517333 1.028,-3.824 0.23333,-2.434666 -0.41067,-4.761333 -0.82267,-7.125333 -0.50266,-2.876 -1.64,-5.608 -2.78533,-8.278666 -3.13067,-7.306667 -4.668,-24.434667 -0.244,-36.468 4.42267,-12.0319992 7.952,-18.6146657 9.544,-17.3759991 1.59333,1.2386666 4.91067,4.5253332 3.672,6.1186661 -1.66,2.133334 -2.12933,5.774667 -2.77333,8.312 -0.46667,1.834667 -1.21334,8.92 -4.57867,6.238667 -1.18267,-0.941334 -1.54133,-1.312 -2.596,0.376 -0.80133,1.281333 -1.25867,3.154666 -1.012,4.714666 0.0987,0.625334 0.77467,1.498667 0.82133,2.054667 0.0813,0.961333 -0.47333,1.482666 -0.66266,2.416 -0.35067,1.74 -0.33334,2.932 1.152,4.001333 -0.44934,0.574667 -0.892,1.177333 -0.94667,1.889333 0.096,0.02 0.192,0.03867 0.28933,0.05867 0.37334,0.912 -0.25466,1.676 -0.23866,2.592 0.003,0.225333 0.55466,0.756 0.624,1.04 0.0707,0.282667 -0.0747,0.976 -0.0307,1.324 0.072,0.565333 0.69867,0.574667 0.69867,1.224" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path23615"/>
    <path d="m 271.80106,65.167875 c -7.84667,-8.893333 -18.832,-18.309333 -17.26267,-34.526666 1.56934,-16.215999 6.8,-21.9706659 6.8,-21.9706659 0,0 -4.708,-8.36933311 -9.93866,-3.1386666 -5.232,5.2306665 -14.952,37.5439995 -5.75467,54.4053325 3.13867,5.753333 3.66133,12.554666 3.66133,12.554666 0,0 0.028,-7.181333 -2.272,-14.790666 -2.3,-7.608 -5.30933,-23.18 -0.88533,-35.212 4.424,-12.031999 7.432,-18.5799991 9.024,-17.3413325 1.59333,1.2386667 4.24667,3.3626666 3.008,4.9546665 -1.23733,1.593333 -4.24667,13.270666 -4.95333,18.933333 -0.708,5.662666 1.12266,16.522666 3.184,19.994666 6.724,11.325333 15.38933,16.137333 15.38933,16.137333" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path23625"/>
    <path d="m 254.22013,3.3252099 c -0.0467,0.032 -0.0933,0.065333 -0.14,0.1 -1.468,1.084 -2.01467,2.8093333 -2.67467,4.4359999 -0.74933,1.848 -0.824,3.9480002 -0.76,5.9133332 0.11467,3.561333 1.60533,7 4.196,8.996 1.064,0.818666 2.26533,1.906666 3.43333,0.890666 1.14134,-0.993333 1.83867,-2.456 2.224,-3.911999 0.788,-2.976 1.33067,-6.056 1.26934,-9.142667 -0.0507,-2.5706665 -0.408,-5.9399998 -2.33734,-7.8519997 -0.76533,-0.7586667 -1.616,-0.8493333 -2.63466,-0.5733334 -0.912,0.2466667 -1.80267,0.6053334 -2.576,1.144" style="fill:#cd976d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path23629"/>
    <path d="m 258.42893,5.9477432 c -1.456,-1.444 -3.88,0.3893333 -4.69067,1.6799999 -1.11333,1.7706667 -1.43733,3.8719999 -1.37067,5.9239999 0.076,2.361333 1.048,4.292 2.63334,5.985333 1.03733,1.106667 1.528,1.824 2.632,0.358667 2.06533,-2.74 1.70533,-6.562667 1.70266,-9.758667 -0.001,-1.5106662 0.31867,-2.9746662 -0.90666,-4.1893328" style="opacity:0.5;fill:#c14242;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path23639"/>
    <path d="m 258.42893,5.9477432 c -1.456,-1.444 -3.88,0.3893333 -4.69067,1.6799999 -1.11333,1.7706667 -1.43733,3.8719999 -1.37067,5.9239999 0.076,2.361333 1.048,4.292 2.63334,5.985333 0.33866,0.361334 0.72533,0.868 1.07333,1.142667 -0.548,-0.769333 -0.74667,-1.728 -0.91333,-2.622667 -0.416,-2.230666 -0.78934,-5.093333 0.10666,-7.256 0.30667,-0.741333 0.964,-1.6533329 1.80667,-1.8333329 1.14133,-0.2453333 1.972,2.3319999 2.032,3.1613329 0.15733,-0.717333 0.27467,-1.444 0.352,-2.1746662 0.14533,-1.3866667 0.024,-2.9626666 -1.02933,-4.0066666" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path23655"/>
    <path d="m 254.42333,4.3294766 c -0.0427,0.029333 -0.084,0.058667 -0.12534,0.089333 -1.31733,0.972 -1.808,2.5199999 -2.4,3.9786666 -0.672,1.6559998 -0.74,3.5399998 -0.68266,5.3026668 0.104,3.193333 1.44133,6.277333 3.76533,8.066666 0.95467,0.734667 2.03333,1.710667 3.08133,0.8 1.024,-0.890666 1.64934,-2.204 1.996,-3.509333 0.70667,-2.668 1.19334,-5.429333 1.13867,-8.198666 -0.0453,-2.3053338 -0.36667,-5.3266671 -2.09733,-7.0413337 -0.688,-0.6813333 -1.44934,-0.7613333 -2.36534,-0.5133333 -0.81733,0.2199999 -1.616,0.5426666 -2.31066,1.0253333 m 4.20666,-3.95599994 c 0.128,0.0613333 0.252,0.13599999 0.37067,0.21599999 1.04267,0.69733335 1.79867,1.76399995 2.3,2.91333325 2.24267,5.1386666 1.168,11.3733334 -0.36,16.5453334 -0.48,1.625333 -1.34667,3.26 -2.76667,4.369333 -1.452,1.133333 -2.948,-0.08133 -4.27066,-0.996 -3.224,-2.228 -5.07867,-6.066666 -5.22134,-10.044 -0.0867,-2.409333 0.0907,-4.7999998 1.08934,-6.9199998 0.724,-1.5373333 1.632,-3.8506666 3.172,-4.7506665 1.288,-0.75333336 2.916,-1.23733335 4.38266,-1.45333334 0.31067,-0.0466667 0.63067,-0.08 0.93734,-0.0106667 0.12666,0.028 0.24933,0.0733333 0.36666,0.13066667" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path23665"/>
</g>`;

export enum ProstheticPlacement {
    VeryBack, BaseHead, VeryFront
}

class ProstheticCatalog {

    private static _instance: ProstheticCatalog;

    public static get instance() {
        if (ProstheticCatalog._instance == null) {
            ProstheticCatalog._instance = new ProstheticCatalog();
        }
        return ProstheticCatalog._instance;
    }

    getProsthetic(token: Token, placement: ProstheticPlacement) {
        if (token.species === Species.Andorian) {
            switch (placement) {
                case ProstheticPlacement.VeryBack:
                    return AndorianAntennaBack.replace(SpeciesRestrictions.DEFAULT_SKIN_COLOR_REGEX, token.skinColor);
                case ProstheticPlacement.VeryFront:
                    return AndorianAntennaFront.replace(SpeciesRestrictions.DEFAULT_SKIN_COLOR_REGEX, token.skinColor);
                default:
                    return "";
            }
        } else if (token.species === Species.Klingon) {
            if (placement === ProstheticPlacement.BaseHead) {
                switch (token.speciesOption) {
                    case SpeciesOption.Option1:
                        return KlingonForehead1.replace(SpeciesRestrictions.DEFAULT_HAIR_COLOR_REGEX, token.skinColor);
                    case SpeciesOption.Option2:
                        return KlingonForehead2.replace(SpeciesRestrictions.DEFAULT_HAIR_COLOR_REGEX, token.skinColor);
                    case SpeciesOption.Option3:
                        return KlingonForehead3.replace(SpeciesRestrictions.DEFAULT_HAIR_COLOR_REGEX, token.skinColor);
                    default:
                        return "";
                }
            }
        } else {
            return "";
        }
    }

}

export default ProstheticCatalog;
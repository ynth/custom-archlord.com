
var DETAILTOTAL2 = { 'skills': {} };

var TYPEDETAIL = {
	combat: {
		div_count: 0,
		row_count: 0,
		div_selector: '#combat_div',
		div_class: '',
	},
	buff: {
		div_count: 0,
		row_count: 0,
		div_selector: '#buff_div',
		div_class: '',
	},
	class: {
		div_count: 0,
		row_count: 0,
		div_selector: '#class_div',
		div_class: '',
	},
	passive: {
		div_count: 0,
		row_count: 0,
		div_selector: '#passive_div',
		div_class: '',
	},
	combo: {
		div_count: 0,
		row_count: 0,
		div_selector: '#combo_div',
		div_class: '',
	},
	heroic: {
		div_count: 0,
		row_count: 0,
		div_selector: '#heroic_div',
		div_class: '',
	},
};

//fix name
for (var i = 0; i < SKILLCONST1.length; i++) {
	if (i != 0 && !SKILLCONST1[i].name) {
		SKILLCONST1[i].name = SKILLCONST1[i - 1].name
	}
}

for (var i = 0; i < SKILLCONST2.length; i++) {
	if (i != 0 && !SKILLCONST2[i].name2) {
		SKILLCONST2[i].name2 = SKILLCONST2[i - 1].name2
	}
}

const removeFields = ["Skill_Success_Rate", "Stun_Rate", "Area_Length", "Area_Width",
	"Range_Increase", "Special_Status_Success_Rate","Pet_Level_Increase"]

console.clear();

Object.keys(DETAIL['skills']).forEach(function (param, key) {

	//CONST1
	//door elke item loopen van JSON 
	const item = DETAIL['skills'][param];
	const results = SKILLCONST1.filter(x => x.name === item.name.replace("_", " "));
	if (results.length === 20) {
		//loop through all 20 lelvels of each skill
		for (var i = 0; i < 20; i++) {

			const skill_level = i + 1;
			const original = item.levels[`Lv${skill_level}`];
		
			const c = results.filter(r => r.skill_level == skill_level)[0];
			

			//update json		
			for (const x of mapping) {
				if (original && original.Required_Level) {
					if (c[x.cal]) {
						if (original[x.org] != c[x.cal] && removeFields.indexOf(x.org) === -1)
						{
							console.warn(`Skillbuilder updated for ${item.name} ${original.Skill_Level}`)
							console.log(`${x.org} = ${c[x.cal]}`)
							/*console.log(``)*/
						}				
						original[x.org] = x.cal ? c[x.cal] : undefined;
					}
				}
			}

			//remove unwanted props
			if (original && original.Skill_Success_Rate) { delete original.Skill_Success_Rate; }
			if (original && original.Stun_Rate) { delete original.Stun_Rate; }
			if (original && original.Area_Length) { delete original.Area_Length; }
			if (original && original.Area_Width) { delete original.Area_Width; }
			if (original && original.Range_Increase) { delete original.Range_Increase; }
			if (original && original.Special_Status_Success_Rate) { delete original.Special_Status_Success_Rate; }
			if (original && original.Pet_Level_Increase) { delete original.Pet_Level_Increase; }
		}
	}

	//CONST2
	const results2 = SKILLCONST2.filter(x => x.name2 === item.name.replace("_", " "));

	if (results2.length === 15) {
		for (var i = 0; i < 15; i++) {

			const skill_level = i + 1;
			const original = item.levels[`Lv${skill_level}`];
			const c = results.filter(r => r.skill_level == skill_level)[0];			
		
			for (const x of mapping2) {
				if (original && original.Required_Level) {
					if (c && c[x.cal]) {
					
						original[x.org] = x.cal ? c[x.cal] : undefined;
						
					}
				}
			}
		}
	}
});

//console.clear();
//const myJSON = JSON.stringify(DETAIL);
//console.log(myJSON);

Object.keys(DETAIL['skills']).forEach(function (param, key) {
	DETAILTOTAL2.skills[param] = DETAIL['skills'][param];
});

Object.keys(DETAIL2['skills']).forEach(function (param, key) {
	Object.keys(DETAIL2['skills'][param]).forEach(function (param2) {
		DETAILTOTAL2.skills[param][param2] = DETAIL2['skills'][param][param2];

	});
});


var DETAILTOTAL = DETAILTOTAL2;
var DATA = [];
var TOTALPOINT = 4;
var LEVEL;
var TOTAL_POINT;
var HIDDEN_TABLE = [
	'level', 'Compatible_Class_Knight', 'Compatible_Class_Archer', 'Compatible_Class_Mage',
	'Compatible_Class_Berserker', 'Compatible_Class_Hunter', 'Compatible_Class_Sorcerer',
	'Compatible_Class_Swashbuckler', 'Compatible_Class_Ranger', 'Compatible_Class_Elementalist',
	'Compatible_Class_Slayer', 'Compatible_Class_Orbiter', 'Compatible_Class_Summoner', 'Compatible_Class_Scion'
];

for (var i = 4; i <= 99; i++) {

	if (i <= 49) {
		TOTALPOINT = 1 + TOTALPOINT;
	} else if (i <= 69) {
		TOTALPOINT = TOTALPOINT + 2;

	} else {
		TOTALPOINT = 1 + TOTALPOINT;
	}




	$('<option/>')
		.val(i)
		.html(i)
		.attr('data-level', TOTALPOINT)
		.appendTo('#level_select')



	if (i == 99) {
		$('#level_select').val(99);
	}
}

function ContainsKeyValue(obj, key, value) {
	if (obj[key] === value) return true;
	for (all in obj) {
		if (obj[all] != null && obj[all][key] === value) {
			return true;
		}
		if (typeof obj[all] == "object" && obj[all] != null) {
			var found = ContainsKeyValue(obj[all], key, value);
			if (found == true) return true;
		}
	}
	return false;
}


function SkillSearch(key, search) {
	var liveData = [];


	for (var items in DETAILTOTAL.skills) {

		if (ContainsKeyValue(DETAILTOTAL.skills[items], key, search) === true) {
			DETAILTOTAL.skills[items]['key'] = items;
			liveData.push(DETAILTOTAL.skills[items]);
		}
	}

	this.DATA = liveData;

	return liveData;

}

function skillForDiv(array) {



	array.sort((a, b) => a.grid - b.grid).forEach(function (element, index) {



		var div = '';
		var className = '';

		Object.keys(TYPEDETAIL).forEach(function (param) {
			if (element.type == param) {
				div = TYPEDETAIL[param].div_selector;
				className = TYPEDETAIL[param].div_class;
			}

		})


		if (typeof div !== 'undefined') {


			selector = $(div).find('[data-grid="' + element.grid + '"][data-sort="' + element.sort + '"]');

			selector.attr('data-skill-id', element.key).html(`<div class="ust">
            `+ element.name + `
            </div>
            <div class="orta">
              <a id="skill_info_button" href="#"> 
                <img src="assets/skiller/`+ element.key + `.jpg" alt="">
              </a>
              <div class="oklar">
                <div class="yukari"></div>
                <div class="asagi"></div>
              </div>
            </div>
            <div class="alt">
              <span class="selected_point_span" data-required_level="0" data-point="0" id="selected_point" >0</span>  / <span data-point="5" id="selected_total_point">5</span>
            </div>
          </div>`);
		}
	});
}


function init() {
	val = $('#skillbuilder_selectlist').val();

	LEVEL = $('#level_select').val();
	TOTAL_POINT = $('#level_select').find('option:selected').data('level');


	$('#combat_div').html('<div class="titleken">Combat</div>');
	$('#buff_div').html('<div class="titleken">Buff</div>');
	$('#class_div').html('<div class="titleken">Class</div>');
	$('#passive_div').html('<div class="titleken">Passive</div>');
	$('#combo_div').html('<div class="titleken">Combo</div>');
	$('#heroic_div').html('');


	$('#skill_points_total').html(TOTAL_POINT);
	$('#heroic_points').html(0);
	$('#minlevelneed').html(0);

	array = SkillSearch(val, true);
	Object.keys(array).forEach(function (param) {
		Object.keys(TYPEDETAIL).forEach(function (param3) {

			if (param3 == array[param].type) {
				if (TYPEDETAIL[param3].div_count < array[param].grid) {
					TYPEDETAIL[param3].div_count = array[param].grid;
				}
				if (TYPEDETAIL[param3].row_count < array[param].sort) {
					TYPEDETAIL[param3].row_count = array[param].sort;

					if (array[param].sort == 3) {
						TYPEDETAIL[param3].div_class = 'uclu';
					}
				}
			}

		})
	})

	Object.keys(TYPEDETAIL).forEach(function (param) {
		for (var i = 1; i <= (TYPEDETAIL[param].div_count); i++) {
			for (var a = 1; a <= TYPEDETAIL[param].row_count; a++) {
				$(TYPEDETAIL[param].div_selector).append(
					`<div data-grid="` + i + `" data-sort = "` + a + `" class="skill_container ` + TYPEDETAIL[param].div_class + `">
                   </div>`);
			}
		}
	})

	skillForDiv(array);
}

function searchIdKey(search_key) {

	for (let value of DATA) {

		if (search_key == value.key) {

			return value;
		}

	};

	return;


}
init();

function errorView(message, title = null) {
	//$('#errorInfo_body').html(message);
	//$("#errorInfo").fadeIn(100)
	alert(message);
}

$('#skillbuilder_selectlist,#level_select').change(function (a) {
	init();
});



$('body').on('click', '.yukari', function (i) {
	main = $(this).closest('.skill_container');
	point_span = main.find('#selected_point');
	total_point_span = $(this).closest('.skill_container').find('#selected_total_point');
	skillDetail = searchIdKey(main.data('skillId'));
	point = point_span.data('point') + 1;
	requiredLevel = skillDetail.levels['Lv' + point].Required_Level;
	skillRequired = skillDetail.required_skill;

	if (typeof skillRequired == 'object') {

		Object.keys(skillRequired).forEach(function (key) {
			explode = key.split('_');

			requiredSkillName = (explode[1].split('-'))[1];
			requiredSkillLevel = parseInt(explode[2].replace("Lvl", ""));
			requiredSkillDiv = $('[data-skill-id="' + explode[1] + '"]');
			nowRequiredSkillPoint = requiredSkillDiv.find('#selected_point').data('point');

			if (nowRequiredSkillPoint < requiredSkillLevel) {


				errorView('Required Skill ' + requiredSkillName + ' Level : ' + requiredSkillLevel);

				throw BreakException;


			}
		});


	}


	if (LEVEL >= requiredLevel) {
		if (point_span.data('point') < total_point_span.data('point')) {
			point_span.data('point', point);
			point_span.data('required_level', requiredLevel);
			point_span.html(point);
		} else {
		}

	} else {
		errorView('It requires level ' + requiredLevel + '!')

	}



});
$('body').on('click', '.asagi', function () {
	main = $(this).closest('.skill_container');
	point_span = main.find('#selected_point');
	total_point_span = $(this).closest('.skill_container').find('#selected_total_point');



	skillDetail = searchIdKey(main.data('skillId'));



	point = point_span.data('point') - 1;

	if (point > 0) {
		requiredLevel = skillDetail.levels['Lv' + point].Required_Level;
	} else {
		requiredLevel = 0;
	}


	if (point_span.data('point') > 0) {
		point_span.data('point', point);
		point_span.data('required_level', requiredLevel);
		point_span.html(point);
	}





});



$('body').on('click', '.asagi,.yukari', function (param) {

	point = 0;
	required_level = 0;
	$('.selected_point_span').each(function (key, item) {

		point = point + $(item).data('point');
		required_levelEnd = $(item).data('required_level');

		if (required_level < required_levelEnd) {
			required_level = required_levelEnd;
		}

	})

	$('#skill_points').html(point);
	$('#minlevelneed').html(required_level);
})


$('body').on('click', "#skill_info_button", function (a) {


	a.preventDefault();
	$('#single_skill_table').html('');
	detail = searchIdKey($(this).closest('.skill_container').data('skillId'));




	$('#single_skill_description').html(detail.description);
	$('#single_skill_image').attr('src', 'assets/skiller/' + detail.key + '.jpg');
	$('#single_skill_name').html(detail.name);


	allData = {
		level: [],

	};
	Object.entries(detail.levels).forEach(function (param) {



		allData['level'].push(param[0]);


		Object.entries(param[1]).forEach(function (veriable, key) {
			if (typeof allData[veriable[0]] == 'undefined') {
				allData[veriable[0]] = [];
			}
		});

		Object.entries(allData).forEach(function (allDataItem) {
			if (typeof param[1][allDataItem[0]] != 'undefined') {
				allData[allDataItem[0]].push(param[1][allDataItem[0]]);
			} else {
				allData[allDataItem[0]].push('-');
			}


		})


	});





	Object.entries(allData).forEach(function (allDataItem) {
		if (HIDDEN_TABLE.indexOf(allDataItem[0]) < 0) {

			html = '<tr><th>' + allDataItem[0] + '</th>';

			Object.entries(allDataItem[1]).forEach(function (allDataItem2) {
				html += '<td>' + allDataItem2[1] + '</td>';
			});

			html += '</tr>';


			$('#single_skill_table').append(html);

		}


	});

	$('#required_list_skill').html('');

	RequiredLiHtml = '';
	if (detail.required_skill != undefined) {


		Object.keys(detail.required_skill).forEach(function (param) {

			console.log(param);

			RequiredLiHtml += '<li>' + param.split('-')[1] + '<li>';

		})

		$('#required_list_skill').html(RequiredLiHtml);
	}


	$("#infoModal").fadeIn(100)

})
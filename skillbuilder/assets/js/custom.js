var register_request;
var login_request;
var logout_request;
var change_pwd_request;
var balance_out_request;

$(document).ready(function () {
	var btn = document.getElementById('reg_submit');
	var test_btn = document.getElementById('test_reg_submit');

	if (test_btn == null) {
		return;
	}
	test_btn.addEventListener('click', function () {
		if (register_request) {
			return;
		}
		var $form = $('#reg_form ');
		var $inputs = $form.find("input, button");
		var serialized_data = $form.serialize();

		$('#reg_password').val("");
		$('#reg_result').text("");
		$("#reg_result_success").text('');
		$inputs.prop("disabled", true);
		register_request = $.ajax({
			url: 'post_interface/test-register',
			type: 'POST',
			data: serialized_data
		});
		register_request.done(function (response, text_status, jqXHR) {
			var result = $('#reg_result');
			var reg_result_success = $('#reg_result_success');

			if (response.search("CONN_FAILED") != -1 || response.search("QUERY_FAILED") != -1) {
				result.text("Server is inaccessible.");
				return;
			}
			if (response.search("INVALID_LENGTH") != -1) {
				result.text("Invalid username/password length.");
				return;
			}
			if (response.search("INVALID_CHARACTER") != -1 || response.search("INVALID_USERNAME") != -1) {
				result.text("Invalid username.");
				return;
			}
			if (response.search("EXISTING_USERNAME") != -1) {
				result.text("Username already exists.");
				return;
			} if (response.search("MAIL_GONDERILEMEDI") != -1) {
				result.html("Confirmation email has NOT been sent!<br><br> Please try again later or try different email address like (gmail,hotmail,yahoo etc.) ");
				return;
			}
			if (response != "OK") {
				result.text("Service unavailable. Please try again later.");
				return;
			}
			if (response == "OK") {
				reg_result_success.text("Confirmation email has been sent to your email.");
				return;
			}
			$('#login_header').trigger('click');
		});
		register_request.fail(function (jqXHR, text_status, error_thrown) {
		});
		register_request.always(function () {
			$inputs.prop("disabled", false);
			register_request = null;
		});
	});


	if (btn == null) {
		return;
	}
	btn.addEventListener('click', function () {
		if (register_request) {
			return;
		}
		var $form = $('#reg_form ');
		var $inputs = $form.find("input, button");
		var serialized_data = $form.serialize();

		$('#reg_password').val("");
		$('#reg_result').text("");
		$("#reg_result_success").text('');
		$inputs.prop("disabled", true);
		register_request = $.ajax({
			url: 'post_interface/register',
			type: 'POST',
			data: serialized_data
		});
		register_request.done(function (response, text_status, jqXHR) {
			var result = $('#reg_result');
			var reg_result_success = $('#reg_result_success');

			if (response.search("CONN_FAILED") != -1 || response.search("QUERY_FAILED") != -1) {
				result.text("Server is inaccessible.");
				return;
			}
			if (response.search("INVALID_LENGTH") != -1) {
				result.text("Invalid username/password length.");
				return;
			}
			if (response.search("INVALID_CHARACTER") != -1 || response.search("INVALID_USERNAME") != -1) {
				result.text("Invalid username.");
				return;
			}
			if (response.search("EXISTING_USERNAME") != -1) {
				result.text("Username already exists.");
				return;
			} if (response.search("MAIL_GONDERILEMEDI") != -1) {
				result.html("Confirmation email has NOT been sent!<br><br> Please try again later or try different email address like (gmail,hotmail,yahoo etc.) ");
				return;
			}
			if (response != "OK") {
				result.text("Service unavailable. Please try again later.");
				return;
			}
			if (response == "OK") {
				reg_result_success.text("Confirmation email has been sent to your email.");
				return;
			}
			$('#login_header').trigger('click');
		});
		register_request.fail(function (jqXHR, text_status, error_thrown) {
		});
		register_request.always(function () {
			$inputs.prop("disabled", false);
			register_request = null;
		});
	});
});

$(document).ready(function () {
	var btn = document.getElementById('login_submit');

	if (btn == null) {
		return;
	}
	btn.addEventListener('click', function () {
		if (login_request) {
			return;
		}
		var $form = $('#login_form ');
		var $inputs = $form.find("input, button");
		var serialized_data = $form.serialize();

		$('#login_password').val("");
		$('#login_error').text("");
		$inputs.prop("disabled", true);
		login_request = $.ajax({
			url: 'post_interface/login',
			type: 'POST',
			data: serialized_data
		});
		login_request.done(function (response, text_status, jqXHR) {
			var result = $('#login_error');

			if (response.search("CONN_FAILED") != -1 || response.search("QUERY_FAILED") != -1) {
				result.text("Server is inaccessible.");
				return;
			}
			if (response.search("INVALID_INPUT") != -1 || response.search("INVALID_LENGTH") != -1) {
				result.text("Invalid username/password length.");
				return;
			}
			if (response.search("INVALID_USERNAME") != -1 || response.search("INVALID_PASSWORD") != -1) {
				result.text("Invalid username or password.");
				return;
			}
			if (response.search("EXISTING_USERNAME") != -1) {
				result.text("Username already exists.");
				return;
			}
			if (response != "OK") {
				result.text("Service unavailable. Please try again later.");
				return;
			}
			location.reload();
		});
		login_request.fail(function (jqXHR, text_status, error_thrown) {
		});
		login_request.always(function () {
			$inputs.prop("disabled", false);
			login_request = null;
		});
	});
});

function onLogout() {
	if (logout_request) {
		return false;
	}
	logout_request = $.ajax({
		url: 'post_interface/logout',
		type: 'POST',
		data: ''
	});
	logout_request.always(function () {
		location.reload();
		logout_request = null;
	});
	return true;
}

$(document).ready(function () {
	var btn = document.getElementById('change_pwd_submit');

	if (btn == null) {
		return;
	}
	btn.addEventListener('click', function () {
		if (change_pwd_request) {
			return;
		}
		var $form = $('#change_pwd_form ');
		var $inputs = $form.find("input, button");
		var values = {
			'password': document.getElementById('password').value,
			'new_password': document.getElementById('new_password').value,
			'new_password_rpt': document.getElementById('new_password_rpt').value
		};

		$('#password').val("");
		$('#new_password').val("");
		$('#new_password_rpt').val("");
		$('#change_pwd_success').text("");
		$('#change_pwd_error').text("");
		$inputs.prop("disabled", true);
		change_pwd_request = $.ajax({
			url: 'post_interface/change_pwd',
			type: 'POST',
			data: values
		});
		change_pwd_request.done(function (response, text_status, jqXHR) {
			var result = $('#change_pwd_error');

			if (response.search("CONN_FAILED") != -1 || response.search("QUERY_FAILED") != -1) {
				result.text("Server is inaccessible.");
				return;
			}
			if (response.search("INVALID_INPUT") != -1 || response.search("INVALID_LENGTH") != -1) {
				result.text("Invalid password length.");
				return;
			}
			if (response.search("INVALID_PASSWORD") != -1) {
				result.text("Invalid password.");
				return;
			}
			if (response.search("NOT_MATCHING") != -1) {
				result.text("New passwords do no match.");
				return;
			}
			if (response != "OK") {
				result.text("Service unavailable. Please try again later.");
				return;
			}
			$('#change_pwd_success').text("Password was changed successfully.")
		});
		change_pwd_request.fail(function (jqXHR, text_status, error_thrown) {
		});
		change_pwd_request.always(function () {
			$inputs.prop("disabled", false);
			change_pwd_request = null;
		});
	});
});

$(document).ready(function () {
	var btn = document.getElementById('balance_out_submit');

	if (btn == null) {
		return;
	}
	btn.addEventListener('click', function () {
		if (balance_out_request) {
			return;
		}
		$('#balance_out_ok').text("");
		$('#balance_out_error').text("");
		balance_out_request = $.ajax({
			url: 'post_interface/balance_out',
			type: 'POST',
			data: ''
		});
		balance_out_request.done(function (response, text_status, jqXHR) {
			var result = $('#balance_out_error');

			if (response.search("CONN_FAILED") != -1 || response.search("QUERY_FAILED") != -1) {
				result.text("Server is inaccessible.");
				return;
			}
			if (response.search("INVALID_INPUT") != -1 || response.search("INVALID_LENGTH") != -1) {
				result.text("Something went wrong.");
				return;
			}
			if (response.search("INVALID_BALANCE") != -1) {
				result.text("Insufficient balance.");
				return;
			}
			if (response != "OK") {
				result.text("Service unavailable. Please try again later.");
				return;
			}
			$('#pending_balance').text("Pending Balance: 0")
			$('#balance_out_ok').text("Pending balance was successfully transfered to the game.")
		});
		balance_out_request.fail(function (jqXHR, text_status, error_thrown) {
		});
		balance_out_request.always(function () {
			balance_out_request = null;
		});
	});
});
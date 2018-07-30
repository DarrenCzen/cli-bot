var fs = require('fs');
var opn = require('opn');
var cmd = require('node-cmd');
var request = require('request');
var PythonShell = require('python-shell');
const Swal = require('sweetalert2');

function saveSettings() {
    if (fs.existsSync('config.json')) {
        fs.readFile('config.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err)
            } else {
                obj = JSON.parse(data);
                obj.settings = {}
                var keyVal = document.getElementById('key').value
                var domainVal = document.getElementById('domain').value
                var emailVal = document.getElementById('email').value
                var capapiVal = document.getElementById('capapi').value
                var webhookVal = document.getElementById('webhook').value
                var sizeVal = document.getElementById('size').value
                var delayVal = document.getElementById('delay').value
                var entryVal = document.getElementById('entry').value
                var proxiesVal = document.getElementById('enableproxy').checked
                var randomNameVal = document.getElementById('enablerandomname').checked
                var enableJigAddyVal = document.getElementById('enablejigaddy').checked
                obj.settings = {
                    proxies: proxiesVal,
                    randomName: randomNameVal,
                    enableJigAddy: enableJigAddyVal,
                    passphrase: keyVal,
                    domain: domainVal,
                    email: emailVal,
                    capapi: capapiVal,
                    webhook: webhookVal,
                    size: sizeVal,
                    delay: delayVal,
                    entry: parseInt(entryVal)
                };
                json = JSON.stringify(obj);
                fs.writeFile('config.json', json, 'utf8', function nothinCallback(err, data) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    } else {
        var obj = {
            settings: {},
            billing: {}
        };
        var json = JSON.stringify(obj);
        fs.writeFile('config.json', json, 'utf8', function whateverCallback(err, data) {
            if (err) {
                console.log(err)
            }
        });
        saveSettings()
    }
}

function saveBilling() {
    if (fs.existsSync('config.json')) {
        fs.readFile('config.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err)
            } else {
                obj = JSON.parse(data);
                obj.billing = {}
                var firstNameVal = document.getElementById('fname').value
                var lastNameVal = document.getElementById('lname').value
                var addressVal = document.getElementById('address').value
                var address2Val = document.getElementById('address2').value
                var aptVal = document.getElementById('apt').value
                var cityVal = document.getElementById('city').value
                var stateVal = document.getElementById('state').value
                var countryVal = document.getElementById('country').value
                var zipVal = document.getElementById('zipcode').value
                var phoneVal = document.getElementById('phone').value
                var bdayVal = document.getElementById('birthday').value
                var ccVal = document.getElementById('ccnumber').value
                var ccMonthVal = document.getElementById('ccmonth').value
                var ccYearVal = document.getElementById('ccyear').value
                var cvvVal = document.getElementById('cvv').value
                obj.billing = {
                    firstName: firstNameVal,
                    lastName: lastNameVal,
                    address1: addressVal,
                    address2: address2Val,
                    apt: aptVal,
                    city: cityVal,
                    state: stateVal,
                    country: countryVal,
                    zipCode: zipVal,
                    phone: phoneVal,
                    birthday: bdayVal,
                    ccVal: ccVal,
                    expMonth: ccMonthVal,
                    expYear: ccYearVal,
                    cvv: cvvVal,
                };
                json = JSON.stringify(obj);
                fs.writeFile('config.json', json, 'utf8', function nothinCallback(err, data) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    } else {
        var obj = {
            settings: {},
            billing: {}
        };
        var json = JSON.stringify(obj);
        fs.writeFile('config.json', json, 'utf8', function whateverCallback(err, data) {
            if (err) {
                console.log(err)
            }
        });
        saveBilling()
    }
}

function displaySavedModal() {
    var modal = document.getElementById('savedSettingsModal');
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none"
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none"
        }
    }
}

function displayDependenciesModal() {
    Swal({
        title: '<strong style="font-family: Montserrat Thin; color: black;">DEPENDENCIES INSTALLED</strong>',
        type: 'success',
        focusConfirm: false,
        buttonsStyling: false,
        confirmButtonText: '<span style="color: white; font-size: 18px;">OK</span>',
        confirmButtonClass: "confirm-btn"
    })
}

function displayLatestDownloadModal() {
    Swal({
        title: '<strong style="font-family: Montserrat Thin; color: black;">DOWNLOADED PYC</strong>',
        type: 'success',
        focusConfirm: false,
        buttonsStyling: false,
        confirmButtonText: '<span style="color: white; font-size: 18px;">OK</span>',
        confirmButtonClass: "confirm-btn"
        
    })
}

function saveProxies() {
    var proxies = document.getElementById('proxyinput').value
    fs.writeFile('proxies.txt', proxies, 'utf8', function nothinCallback(err, data) {
        if (err) {
            console.log(err)
        }
    })
}

function saveAllSettings() {
    saveBilling()
    setTimeout(saveSettings, 1000);
    saveProxies()
    Swal({
        title: '<strong style="font-family: Montserrat Thin; color: black;">SETTINGS SAVED!</strong>',
        type: 'success',
        
        focusConfirm: false,
        buttonsStyling: false,
        confirmButtonText: '<span style="color: white; font-size: 18px;">OK</span>',
        confirmButtonClass: "confirm-btn"
        
    })
}

function visitFaq() {
    opn('https://docs.google.com/document/d/19my-WUnBfeQpVOUXutsUe0d9Oalw2u1wcaMjwo-6kN8/edit')
}

function downloadDependencies() {
    displayDependenciesModal()
    cmd.get('pip install uuid', function(err, data, stderr) {
        if (!err) {
            console.log(data)
        } else {
            console.log('error', err)
        }
    });
    cmd.get('pip install lxml', function(err, data, stderr) {
        if (!err) {
            console.log(data)
        } else {
            console.log('error', err)
        }
    });
    cmd.get('pip install bs4', function(err, data, stderr) {
        if (!err) {
            console.log(data)
        } else {
            console.log('error', err)
        }
    });
    cmd.get('pip install names', function(err, data, stderr) {
        if (!err) {
            console.log(data)
        } else {
            console.log('error', err)
        }
    });
    cmd.get('pip install termcolor', function(err, data, stderr) {
        if (!err) {
            console.log(data)
        } else {
            console.log('error', err)
        }
    });
    cmd.get('pip install pyfiglet', function(err, data, stderr) {
        if (!err) {
            console.log(data)
        } else {
            console.log('error', err)
        }
    });
    cmd.get('pip install colorama', function(err, data, stderr) {
        if (!err) {
            console.log(data)
        } else {
            console.log('error', err)
        }
    });
    cmd.get('pip install proxy-manager', function(err, data, stderr) {
        if (!err) {
            console.log(data)
        } else {
            console.log('error', err)
        }
    });
    cmd.get('pip install requests', function(err, data, stderr) {
        if (!err) {
            console.log(data)
        } else {
            console.log('error', err)
        }
    });
    cmd.get('pip install flask', function(err, data, stderr) {
        if (!err) {
            console.log(data)
        } else {
            console.log('error', err)
        }
    });
    cmd.get('pip install selenium', function(err, data, stderr) {
        if (!err) {
            console.log(data)
        } else {
            console.log('error', err)
        }
    });
    cmd.get('pip install python-hosts', function(err, data, stderr) {
        if (!err) {
            console.log(data)
        } else {
            console.log('error', err)
        }
    });
    cmd.get('pip install webbrowser', function(err, data, stderr) {
        if (!err) {
            console.log(data)
        } else {
            console.log('error', err)
        }
    })
}

function downloadUpdate() {
	return;
    request('http://hasterestocks.io/cliLatest', function(error, response, body) {
        var json = JSON.parse(body)
        var download = require('download-file')
        var url = json.url
        var options = {
            directory: "",
            filename: "enter.pyc"
        }
        download(url, options, function(err) {
            if (err) throw err
            console.log("downloaded")
        })
    })
    displayLatestDownloadModal()
}

function loadInfo() {
    var keyVal = document.getElementById('key')
    var domainVal = document.getElementById('domain')
    var emailVal = document.getElementById('email')
    var capapiVal = document.getElementById('capapi')
    var webhookVal = document.getElementById('webhook')
    var sizeVal = document.getElementById('size')
    var delayVal = document.getElementById('delay')
    var entryVal = document.getElementById('entry')
    var proxiesVal = document.getElementById('enableproxy')
    var randomNameVal = document.getElementById('enablerandomname')
    var enableJigAddyVal = document.getElementById('enablejigaddy')
    var firstNameVal = document.getElementById('fname')
    var lastNameVal = document.getElementById('lname')
    var addressVal = document.getElementById('address')
    var address2Val = document.getElementById('address2')
    var aptVal = document.getElementById('apt')
    var cityVal = document.getElementById('city')
    var stateVal = document.getElementById('state')
    var countryVal = document.getElementById('country')
    var zipVal = document.getElementById('zipcode')
    var phoneVal = document.getElementById('phone')
    var bdayVal = document.getElementById('birthday')
    var ccVal = document.getElementById('ccnumber')
    var ccMonthVal = document.getElementById('ccmonth')
    var ccYearVal = document.getElementById('ccyear')
    var cvvVal = document.getElementById('cvv')
    if (fs.existsSync('config.json')) {
        fs.readFile('config.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err)
            } else {
                obj = JSON.parse(data);
                keyVal.value = obj.settings.passphrase
                domainVal.value = obj.settings.domain
                emailVal.value = obj.settings.email
                capapiVal.value = obj.settings.capapi
                webhookVal.value = obj.settings.webhook
                sizeVal.value = obj.settings.size
                delayVal.value = obj.settings.delay
                entryVal.value = obj.settings.entry
                proxiesVal.checked = obj.settings.proxies
                randomNameVal.checked = obj.settings.randomName
                enableJigAddyVal.checked = obj.settings.enableJigAddy
                firstNameVal.value = obj.billing.firstName
                lastNameVal.value = obj.billing.lastName
                addressVal.value = obj.billing.address1
                address2Val.value = obj.billing.address2
                aptVal.value = obj.billing.apt
                cityVal.value = obj.billing.city
                stateVal.value = obj.billing.state
                countryVal.value = obj.billing.country
                zipVal.value = obj.billing.zipCode
                phoneVal.value = obj.billing.phone
                bdayVal.value = obj.billing.birthday
                ccVal.value = obj.billing.ccVal
                ccMonthVal.value = obj.billing.expMonth
                ccYearVal.value = obj.billing.expYear
                cvvVal.value = obj.billing.cvv
            }
        })
    } else {}
    if (fs.existsSync('proxies.txt')) {
        fs.readFile('proxies.txt', 'utf8', function readFileCallback(err, data) {
            var proxies = document.getElementById('proxyinput')
            proxies.value = data
        })
    }
}

function runPyc() {
    Swal({
        title: '<strong style="font-family: Montserrat Thin; color: black;">PYC Opened! See window.</strong>',
        type: 'success',
        focusConfirm: false,
        buttonsStyling: false,
        confirmButtonText: '<span style="color: white; font-size: 18px;">OK</span>',
        confirmButtonClass: "confirm-btn"
    })
    var isWin = process.platform === "win32";
    if (isWin) {
        var child_process = require('child_process');
        child_process.execSync("start cmd.exe /K py enter.py")
    } else {
        var child_process = require('child_process');
        var open = ['osascript -e \'tell application "Terminal" to activate\' ', '-e \'tell application "System Events" to tell process "Terminal" to keystroke "t"', 'using command down\' ', '-e \'tell application "Terminal" to do script', '"', "cd " + __dirname, '; sleep 1; python enter.py"', 'in selected tab of the front window\''].join('');
        child_process.execSync(open)
    }
}

function closeApp() {
    const remote = require('electron').remote
    let w = remote.getCurrentWindow()
    w.close()
}

function minimizeApp() {
    const remote = require('electron').remote
    remote.BrowserWindow.getFocusedWindow().minimize()
}
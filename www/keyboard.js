/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    channel = require('cordova/channel');
   
var Keyboard = function() {
};

Keyboard.shrinkView = function(shrink, forceShrink, success) {
    var args = [];
    if (shrink !== null && shrink !== undefined) args.push(shrink);
    if (forceShrink !== null && forceShrink !== undefined) args.push(forceShrink);
    exec(success, null, "Keyboard", "shrinkView", args);
};

Keyboard.hideFormAccessoryBar = function(hide, success) {
    if (hide !== null && hide !== undefined){
        exec(success, null, "Keyboard", "hideFormAccessoryBar", [hide]);
    } else {
        exec(success, null, "Keyboard", "hideFormAccessoryBar", []);
    }
};

Keyboard.disableScrollingInShrinkView = function(disable, success) {
    if (disable !== null && disable !== undefined) {
        exec(success, null, "Keyboard", "disableScrollingInShrinkView", [disable]);
    } else {
        exec(success, null, "Keyboard", "disableScrollingInShrinkView", []);
    }
};

Keyboard.fireOnShow = function(keyboardHeight) {
    Keyboard.isVisible = true;
    cordova.fireWindowEvent('keyboardDidShow', { 'keyboardHeight': keyboardHeight });

    if(Keyboard.onshow) {
    	Keyboard.onshow(keyboardHeight);
    }
};

Keyboard.fireOnHide = function(keyboardHeight) {
    Keyboard.isVisible = false;
    cordova.fireWindowEvent('keyboardDidHide', { 'keyboardHeight': keyboardHeight });

    if(Keyboard.onhide) {
    	Keyboard.onhide(keyboardHeight);
    }
};

Keyboard.fireOnHiding = function(keyboardHeight) {
    // Automatic scroll to the top of the page
    // to prevent quirks when using position:fixed elements
    // inside WebKit browsers (iOS specifically).
    // See CB-6444 for context.
    if (Keyboard.automaticScrollToTopOnHiding) {
        document.body.scrollLeft = 0;
    }

    cordova.fireWindowEvent('keyboardWillHide', { 'keyboardHeight': keyboardHeight });

    if(Keyboard.onhiding) {
    	Keyboard.onhiding(keyboardHeight);
    }
};

Keyboard.fireOnShowing = function(keyboardHeight) {
    cordova.fireWindowEvent('keyboardWillShow', { 'keyboardHeight': keyboardHeight });

    if(Keyboard.onshowing) {
    	Keyboard.onshowing(keyboardHeight);
    }
};

Keyboard.show = function() {
    exec(null, null, "Keyboard", "show", []);
};

Keyboard.hide = function() {
    exec(null, null, "Keyboard", "hide", []);
};

Keyboard.isVisible = false;
Keyboard.automaticScrollToTopOnHiding = false;

channel.onCordovaReady.subscribe(function() {
    function success(msg) {
        var action = msg.charAt(0);
        if ( action === 'S' ) {
            var keyboardHeight = msg.substr(1);
            Keyboard.isVisible = true;
            cordova.fireWindowEvent('keyboardDidShow', { 'keyboardHeight': + keyboardHeight });
        } else if ( action === 'H' ) {
            Keyboard.isVisible = false;
            cordova.fireWindowEvent('keyboardDidHide', { 'keyboardHeight': 0 });
        }
    }
    exec(success, null, 'Keyboard', 'init', []);

});

module.exports = Keyboard;

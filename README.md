# cordova-plugin-keyboard

> This plugin provides the `Keyboard` object which has some functions to customize and control the keyboard. It also supports the __HideKeyboardFormAccessoryBar__ (boolean) and __KeyboardShrinksView__ (accepted values: true, false and force (to also shrink the subviews, see Keyboard.shrinkView method below)) preferences in config.xml.

This plugin has only been tested in Cordova 3.2 or greater, and its use in previous Cordova versions is not recommended (potential conflict with keyboard customization code present in the core in previous Cordova versions). 

If you do use this plugin in an older Cordova version (again, not recommended), you have to make sure the HideKeyboardFormAccessoryBar and KeyboardShrinksView preference values are *always* false, and only use the API functions to turn things on/off.

This plugin was based on this Apache [project](https://github.com/apache/cordova-plugins/tree/master/keyboard) and has a compatible API.

- [Installation](#installation)
- [Methods](#methods)
    - [Keyboard.shrinkView](#keyboardshrinkview)
    - [Keyboard.hideFormAccessoryBar](#keyboardhideformaccessorybar)
    - [Keyboard.disableScrollingInShrinkView](#keyboarddisablescrollinginshrinkview)
    - [Keyboard.hide](#keyboardhide)
    - [Keyboard.show](#keyboardshow)
- [Properties](#properties)
    - [Keyboard.isVisible](#keyboardisvisible)
    - [Keyboard.automaticScrollToTopOnHiding](#keyboardautomaticscrolltotoponhiding)
- [Events](#events)
    - [keyboardDidShow](#keyboarddidshow)
    - [keyboardDidHide](#keyboarddidhide)
    - [keyboardWillShow](#keyboardwillshow)
    - [keyboardWillHide](#keyboardwillhide)
    - [keyboardHeightWillChange](#keyboardheightwillchange)
- [Releases](#releases) 

# Installation

From [npm](https://www.npmjs.com/package/cordova-plugin-keyboard) (stable)

`cordova plugin add cordova-plugin-keyboard`

From github latest (may not be stable)

`cordova plugin add https://github.com/cjpearson/cordova-plugin-keyboard`

# Methods

## Keyboard.shrinkView

Shrink the WebView when the keyboard comes up.

    Keyboard.shrinkView(shrink, forceShrink, successCallback);

#### Description

Set to true to shrink the WebView when the keyboard comes up. The WebView shrinks instead of the viewport shrinking and the page scrollable. This applies to apps that position their elements relative to the bottom of the WebView. This is the default behaviour on Android, and makes a lot of sense when building apps as opposed to webpages.

`forceShrink` (Boolean) parameter has been added to indicate if WebView's sub-views should be also shrunk or not. If set to true, it forces scrollView and its content (UIWebBrowserView) to be resized the same way as webView on keyboard events. It is intended to fix the layout problems the iOS SDK 12 has introduced when the keyboard is shown / hidden and the `viewport-fit=cover` property is set. See https://github.com/apache/cordova-ios/issues/472.

This method can be used as a getter by setting the first two parameters to null.


#### Supported Platforms

- iOS

#### Quick Example

    Keyboard.shrinkView(true);
    Keyboard.shrinkView(true, true);
    Keyboard.shrinkView(true, false, function (statesArray) { console.log(statesArray); });
    Keyboard.shrinkView(null, null, function (currentsStatesArray) { 
    	console.log(currentStatesArray); 
    });



## Keyboard.hideFormAccessoryBar

Hide the keyboard toolbar.

    Keyboard.hideFormAccessoryBar(value, successCallback);

#### Description

Set to true to hide the additional toolbar that is on top of the keyboard. This toolbar features the Prev, Next, and Done buttons.

This method can be used as a getter by setting the first parameter to null.


#### Supported Platforms

- iOS

#### Quick Example

    Keyboard.hideFormAccessoryBar(true);
    Keyboard.hideFormAccessoryBar(false);
    Keyboard.hideFormAccessoryBar(null, function (currentValue) { console.log(currentValue); });

## Keyboard.disableScrollingInShrinkView

Disable scrolling when the the WebView is shrunk.

    Keyboard.disableScrollingInShrinkView(value, successCallback);

#### Description

Set to true to disable scrolling when the WebView is shrunk.

This method can be used as a getter by setting the first parameter to null.


#### Supported Platforms

- iOS

#### Quick Example

    Keyboard.disableScrollingInShrinkView(true);
    Keyboard.disableScrollingInShrinkView(false);
    Keyboard.disableScrollingInShrinkView(null, function (currentValue) { console.log(currentValue); });

## Keyboard.hide

Hide the keyboard

    Keyboard.hide();

#### Description

Call this method to hide the keyboard

#### Supported Platforms

- iOS
- Android

#### Quick Example

    Keyboard.hide();

## Keyboard.show

Show the keyboard

    Keyboard.show();

#### Description

Call this method to show the keyboard.


#### Supported Platforms

- Android

#### Quick Example

    Keyboard.show();

# Properties

## Keyboard.isVisible

Determine if the keyboard is visible.

    if (Keyboard.isVisible) {
        // do something
    }

#### Description

Read this property to determine if the keyboard is visible.


#### Supported Platforms

- iOS

## Keyboard.automaticScrollToTopOnHiding

Specifies whenether content of page would be automatically scrolled to the top of the page
when keyboard is hiding.

    Keyboard.automaticScrollToTopOnHiding = true;

#### Description

Set this to true if you need that page scroll to beginning when keyboard is hiding.
This is allows to fix issue with elements declared with position: fixed,
after keyboard is hiding.


#### Supported Platforms

- iOS

# Events

## keyboardDidShow

This event is fired when keyboard fully shown.

    window.addEventListener('keyboardDidShow', function (event) {
        // Describe your logic which will be run each time keyboard is shown.
        console.log(event.keyboardHeight);
    });

#### Description

Attach handler to this event to be able to receive notification when keyboard is shown.


#### Supported Platforms

- iOS

## keyboardDidHide

This event is fired when the keyboard is fully closed.

    window.addEventListener('keyboardDidHide', function (event) {
        // Describe your logic which will be run each time keyboard is closed.
        console.log(event.keyboardHeight);
    });

#### Description

Attach handler to this event to be able to receive notification when keyboard is closed.


#### Supported Platforms

- iOS

## keyboardWillShow

This event fires before keyboard will be shown.

    window.addEventListener('keyboardWillShow', function (event) {
        // Describe your logic which will be run each time when keyboard is about to be shown.
        console.log(event.keyboardHeight);
    });

#### Description

Attach handler to this event to be able to receive notification when keyboard is about to be shown on the screen.


#### Supported Platforms

- iOS

## keyboardWillHide

This event is fired when the keyboard is fully closed.

    window.addEventListener('keyboardWillHide', function (event) {
        // Describe your logic which will be run each time when keyboard is about to be closed.
        console.log(event.keyboardHeight);
    });

#### Description

Attach handler to this event to be able to receive notification when keyboard is about to be closed.


#### Supported Platforms

- iOS

## keyboardHeightWillChange

This event is fired when the keyboard is fully closed.

    window.addEventListener('keyboardHeightWillChange', function (event) {
        // Describe your logic which will be run each time when keyboard is about to be shown or closed.
        console.log(event.keyboardHeight);
    });

#### Description

Attach handler to this event in order to receive a notification when the keyboard is about to be shown or closed.


#### Supported Platforms

- iOS


# Releases

- 1.0.0 
    - Initial NPM release
    - Fix issues with external keyboards
    - Support keyboard events on window
    - Fix issues with split and undocked keyboards
    - Add keyboardHeightWillChange event
    - Fix issues with StatusBarOverlaysWebview
- 1.1.0
    - Add hide/show for Android
    - Support original keyboard event mechanism
- 1.1.1
    - Make compatible with cordova-android 3 and 4 (See [#2](/../../issues/2))
    - Add hide for iOS
- 1.1.2
    - Fix issues with hiding the accessory bar (See [#3](/../../issues/3))
- 1.1.3
    - Support hiding the accessory bar when using WKWebView as the engine (See [here](https://github.com/Telerik-Verified-Plugins/WKWebView/issues/85))
- 1.1.4
    - Fix page scrolling (See [#14](/../../issues/14))
    - Prevent possible app store rejections (See [#21](/../../issues/21)) 
- 1.1.5
    - Fix window.innerHeight when using WKWebView (See [#32](/../../issues/32))


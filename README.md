<a name="Luxafor"></a>

## Luxafor
Control a Luxafor light

**Kind**: global class  

* [Luxafor](#Luxafor)
    * _instance_
        * [.init(cb)](#Luxafor+init)
        * [.simpleColor(char, cb)](#Luxafor+simpleColor)
        * [.color(led, red, green, blue, cb)](#Luxafor+color)
        * [.colorFade(led, red, green, blue, time, cb)](#Luxafor+colorFade)
        * [.strobe(led, red, green, blue, time, repeat, cb)](#Luxafor+strobe)
        * [.wave(type, red, green, blue, repeat, speed, cb)](#Luxafor+wave)
        * [.pattern(pattern, repeat, cb)](#Luxafor+pattern)
        * [.getDeviceInfo()](#Luxafor+getDeviceInfo) ⇒ <code>Promise</code>
    * _static_
        * [.getApiValue(haystack, needle)](#Luxafor.getApiValue)
        * [.findApiReply(buffer)](#Luxafor.findApiReply) ⇒ <code>String</code> \| <code>Buffer</code>

<a name="Luxafor+init"></a>

### luxafor.init(cb)
Initialize a single Luxafor light.  Thank you Dave Irvine.

**Kind**: instance method of [<code>Luxafor</code>](#Luxafor)  

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>Number</code> | callback to execute |

<a name="Luxafor+simpleColor"></a>

### luxafor.simpleColor(char, cb)
Set one of several preset colors from the API

**Kind**: instance method of [<code>Luxafor</code>](#Luxafor)  

| Param | Type | Description |
| --- | --- | --- |
| char | <code>Number</code> | number representing one of the preset colors |
| cb | <code>function</code> | callback to execute |

<a name="Luxafor+color"></a>

### luxafor.color(led, red, green, blue, cb)
Set a color

**Kind**: instance method of [<code>Luxafor</code>](#Luxafor)  

| Param | Type | Description |
| --- | --- | --- |
| led | <code>Number</code> | `0..6` the light to control |
| red | <code>Number</code> | `0..255` red value |
| green | <code>Number</code> | `0..255` green value |
| blue | <code>Number</code> | `0..255` blue value |
| cb | <code>function</code> | callback to execute |

<a name="Luxafor+colorFade"></a>

### luxafor.colorFade(led, red, green, blue, time, cb)
Instantly set a color then set the color change timer
The time param causes the specified time delay to occur on all subsequent calls to color

**Kind**: instance method of [<code>Luxafor</code>](#Luxafor)  

| Param | Type | Description |
| --- | --- | --- |
| led | <code>Number</code> | `0..6` the light to control |
| red | <code>Number</code> | `0..255` red value |
| green | <code>Number</code> | `0..255` green value |
| blue | <code>Number</code> | `0..255` blue value |
| time | <code>Number</code> | `0..255` length of fade effect |
| cb | <code>function</code> | callback to execute |

<a name="Luxafor+strobe"></a>

### luxafor.strobe(led, red, green, blue, time, repeat, cb)
Make the light strobe

**Kind**: instance method of [<code>Luxafor</code>](#Luxafor)  

| Param | Type | Description |
| --- | --- | --- |
| led | <code>Number</code> | `0..6` the light to control |
| red | <code>Number</code> | `0..255` red value |
| green | <code>Number</code> | `0..255` green value |
| blue | <code>Number</code> | `0..255` blue value |
| time | <code>Number</code> | `0..255` length of strobe effect |
| repeat | <code>Number</code> | `0..255` number of iterations, 0 is infinite |
| cb | <code>function</code> | callback to execute |

<a name="Luxafor+wave"></a>

### luxafor.wave(type, red, green, blue, repeat, speed, cb)
Make the light display a wave pattern

**Kind**: instance method of [<code>Luxafor</code>](#Luxafor)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>Number</code> | `0..5` the type of wave |
| red | <code>Number</code> | `0..255` red value |
| green | <code>Number</code> | `0..255` green value |
| blue | <code>Number</code> | `0..255` blue value |
| repeat | <code>Number</code> | `0..255` number of iterations, 0 is infinite |
| speed | <code>Number</code> | `0..255` 0 is faster |
| cb | <code>function</code> | callback to execute |

<a name="Luxafor+pattern"></a>

### luxafor.pattern(pattern, repeat, cb)
Run the light through preprogrammed sequences

**Kind**: instance method of [<code>Luxafor</code>](#Luxafor)  

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>Number</code> | `0..8` the preset pattern to use |
| repeat | <code>Number</code> | `0..255` number of iterations, 0 is infinite |
| cb | <code>function</code> | callback to execute |

<a name="Luxafor+getDeviceInfo"></a>

### luxafor.getDeviceInfo() ⇒ <code>Promise</code>
Get FW_VERSION, SERIAL_NUMBER_H, SERIAL_NUMBER_L from the device
There's no additional information about the meaning of H or L

**Kind**: instance method of [<code>Luxafor</code>](#Luxafor)  
**Returns**: <code>Promise</code> - <code>Buffer</code>  
<a name="Luxafor.getApiValue"></a>

### Luxafor.getApiValue(haystack, needle)
Get an API value by key from the API object
Case insensitive

**Kind**: static method of [<code>Luxafor</code>](#Luxafor)  

| Param | Type | Description |
| --- | --- | --- |
| haystack | <code>String</code> | the string name of haystack |
| needle | <code>String</code> | the key to search |
|  | <code>Number</code> \| <code>Null</code> |  |

<a name="Luxafor.findApiReply"></a>

### Luxafor.findApiReply(buffer) ⇒ <code>String</code> \| <code>Buffer</code>
Search to see if a reply buffer from the device is one we recognize

**Kind**: static method of [<code>Luxafor</code>](#Luxafor)  
**Throws**:

- Will freak out if the device returns an unrecognized byte


| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Buffer</code> | The needle to search for |


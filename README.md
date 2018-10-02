<a name="Luxafor"></a>

## Luxafor
Control a Luxafor light

**Kind**: global class  

* [Luxafor](#Luxafor)
    * [.init(cb)](#Luxafor+init)
    * [.simpleColor(char, cb)](#Luxafor+simpleColor)
    * [.color(led, red, green, blue, cb)](#Luxafor+color)
    * [.colorFade(led, red, green, blue, time, cb)](#Luxafor+colorFade)
    * [.strobe(led, red, green, blue, time, repeat, cb)](#Luxafor+strobe)
    * [.wave(type, red, green, blue, repeat, speed, cb)](#Luxafor+wave)
    * [.pattern(pattern, repeat, cb)](#Luxafor+pattern)

<a name="Luxafor+init"></a>

### luxafor.init(cb)
Initialize the Luxafor light.  Thank you Dave Irvine.

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
Set a color and then fade

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


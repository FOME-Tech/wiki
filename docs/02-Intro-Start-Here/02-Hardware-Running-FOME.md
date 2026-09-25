# Hardware Running FOME

import fomePNP from './Hardware-Running-FOME-imgs/Miata-FOME.png';
import universal112 from '../09-Hardware/04-Base-Boards/universal112.webp'

Currently there is a good amount of hardware options to choose depending on your specific needs. From simple plug and play solutions, to full wire-in universal ECU's. All under the same ecosystem and pretty similar architecture.
Most recent offerings consist of a two-part system. A brain board that gets attached to a daughter board, or base-board as we call it, it contains the wiring harness connector and any additional circuitery for added functionality.

## Brain Boards

This is where the real action happens. Designed to be consistent across different base board applications to simplify design, ensure repeatability, and reduce cost.
    - [Atlas](/Hardware/Brain-Boards/Atlas/FOME-Atlas) Formerly Polygonus

## Base Boards

This is where brain boards get attached to.

### Wire-In

<img src={universal112} alt="fomepnp" style={{width:'100%', height:'auto', aspectRatio: '18/9', objectFit:'cover', objectPosition:'0 45%'}} />

This is Ideal for Custom Wiring Harnesses, complex engine swaps,  or peope willing to cut and modify their OEM harnesses to use another connector.

- FOME Official:
  - [Universal 112](/Hardware/Base-Boards/Polygonus-Universal-112/Universal-112)

### Plug-And-Play

<img src={fomePNP} alt="fomepnp" style={{width:'100%', height:'auto', aspectRatio: '14/9', objectFit:'cover', objectPosition:'0 45%'}} />

[FOMEPnP](Hardware-Running-FOME-imgs/Miata-FOME.png)
_Offered and Supported by Third Parties._  Often Fully assembled solutions unless stated otherwise. Either Brain + Baseboard or Custom All-in-One boards with OEM connector for several makes and models. Some of them include housing/enclosure. And others are meant to replace the OEM ECU PCB inside of the original ECU case.

- Mazda:
  - NA/NB Miata:
    - [🇺🇲 BeerMoneyMotorsports](https://www.beermoneymotorsports.com/collections/miata-mx5-ecus)
- BMW:
  - M20, M30, M42, M60, M54, MS42/MS43,24V OBD1-OBD2
    - [🇺🇲 ClassicDaily](https://www.classicdaily.net/collections/custom-parts?uff_qwa11i_collections=414472798416)
- Honda:
  - OBD1 PnP
    - [🇺🇲 VatoTuned](https://vatotuned.com/products/vato-tuned-honda-obd1-pnp-standalone-ecu) _All-in-One Board_
- Toyota:
  - IS200
    - [🇬🇧 DIY-EFI Core8 IS200](https://diy-efi.co.uk/product/core8-is200-pnp-ecu) Polygonus/Atlas Based.
    - [🇵🇱 NXRD Racing Devices IS200 1G-FE PNP](https://nxrd-shop.com/en/electronics/37-plug-play-ecu-for-lexus-is200-1g-fe-mt.html) Proteus based. All-in-One Board

## RusEFI

Some older pre-fork RusEFI ECUs are compatible with FOME Firmware: _See [GitHub Releases](https://github.com/FOME-Tech/fome-fw/releases)_

- Proteus (F4,F7,H7 Microcontroller)
- MicroRusEFI (F4,F7)
- Hellen PnPs (Hellen 128 Mercedes, Hellen Miata NB1-NB2, NA6-NA8)

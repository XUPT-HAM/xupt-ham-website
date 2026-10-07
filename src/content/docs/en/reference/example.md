---
title: Common terms and parameters
description: A quick reference of common amateur radio terms, units, and formulas.
---

This is the "Reference" part of the Knowledge Base — a cheat sheet of the most common amateur
radio terms and formulas.

## Common quantities

| Quantity | Symbol | Unit |
| --- | --- | --- |
| Frequency | $f$ | Hz |
| Wavelength | $\lambda$ | m |
| Power | $P$ | W |

## Free-space path loss (FSPL)

Signal loss in free space grows with distance and frequency:

$$ \text{FSPL(dB)} = 20\log_{10}(d) + 20\log_{10}(f) + 32.45 $$

where $d$ is distance (in km) and $f$ is frequency (in MHz).

## Antenna gain and effective aperture

$$ D = \frac{4\pi A_e}{\lambda^2} $$

$A_e$ is the antenna's effective aperture and $\lambda$ is the operating wavelength. A larger
aperture means higher gain.

# Acceleration Compensation  

## What is acceleration compensation and why do I need it?

In EFI tuning, acceleration compensation (often called acceleration enrichment or AE) is a feature that adds extra fuel when the engine experiences a rapid increase in airflow, usually from a quick throttle opening. When you stab the throttle, air enters the engine instantly, but fuel delivery lags behind because injectors and fuel atomization can’t respond as fast. Without compensation, the mixture goes lean for a split second, causing hesitation, a stumble, or even backfiring.

You need acceleration compensation to keep the air–fuel ratio stable during throttle transitions, ensuring crisp throttle response, smooth drivability, and reliable power. It essentially fills the gap between the sudden airflow change and the fuel system’s ability to catch up, making the engine behave cleanly during fast acceleration.

## What are the types of acceleration compensation?

There are several types of acceleration compensation, each designed to keep fueling accurate during rapid throttle or load changes. The most common is TPS-based enrichment, which adds fuel according to how quickly the throttle moves; useful for engines where manifold pressure doesn’t instantly reflect airflow. MAP-based enrichment instead reacts to how fast manifold pressure changes, making it effective for boosted or plenum-type intakes. More advanced systems use fuel-film or wall-wetting compensation (such as X-Tau), which models how fuel temporarily sticks to intake surfaces and then evaporates, providing smoother fueling during both acceleration and deceleration. These can be further refined with coolant-temperature and RPM-based adjustments, since engines need different amounts of enrichment at different temperatures and speeds. Together, these methods ensure smooth, predictable throttle response and prevent lean stumbles during sudden changes in airflow.

FOME ECUs typically use a mix of wall TPS-based enrichment for the main compensation as well as well-wetting compensation for a more advanced compensation.
"""Звук выпуска 004 — Кишинёв: SFX и атмосферы, привязанные к событиям картинки (T.EV из ev.json — tools/evdump.cjs) и репликам.
SFX: (файл в assets/sfx без .mp3, время, поправка дБ). BEDS: (луп, начало, конец)."""


def sound(T):
    E, S0, S1, LS, LF, DUR = T.EV, T.S0, T.S1, T.LS, T.LF, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: колокол застрял в окне колокольни, голуби, арка
        ('big_bell_bong', 0.0, -2), ('table_crash', e('hk_jam', -0.05), -4), ('bell_crack', e('hk_jam'), -6), ('pigeons_flutter', e('hk_jam', 0.05), -2),
        ('shimmer', e('hk_pop'), -3), ('watch_click', e('hk_wind'), 0), ('clock_tick_heavy', e('hk_wind', 0.25), -4),
        ('vortex_suck', S0['tunnel'] - 0.3, -2), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # −12 млн: Сарматское море
        ('dive_splash', S0['sea'] - 0.15, -4), ('bubbles_burst', S0['sea'] + 0.2, -6), ('fish_swoosh', e('sea_whale', 0.6), -6), ('tiny_tuk', e('sea_shell'), -2), ('shimmer', e('sea_city'), -3), ('brick_trowel', e('sea_city', 0.3), -8),
        # миоцен: динотерий
        ('heavy_water_loop', S0['dino'] - 0.25, -8), ('dino_steps', S0['dino'] + 0.2, -8), ('elephants', e('dn_tusk', 0.1), -4), ('whip_whoosh', e('dn_down', -0.1), -6),
        # 1466: Кишинёв продают
        ('coins_pouch', S0['boyar'] - 0.2, -4), ('coins_pouch', e('by_sell'), -6), ('coins_pouch', e('by_count'), -2), ('coins_pouch', e('by_count', 0.5), -4), ('stamp_thud', e('by_pile'), -2), ('tiny_tuk', e('by_cheap'), -4),
        # 1820: Пушкин в ссылке
        ('horse_carriage', S0['pushkin'] - 0.3, -2), ('horse_carriage', e('pu_kib', -0.4), -6), ('teleport_pop', e('pu_post'), -4), ('pencil_scribble', e('pu_here'), -6), ('scroll_unroll', e('pu_oneg'), -3), ('shimmer', e('pu_oneg', 0.1), -5),
        # 1822: дуэль с черешней
        ('teleport_pop', S0['duel'] - 0.15, -6), ('watch_click', e('du_aim'), -6), ('tiny_tuk', e('du_eat'), -2), ('tiny_tuk', e('du_spit'), -4), ('pistol_shot_old', e('du_shot', -0.05), -2), ('whip_whoosh', e('du_shot', 0.05), -4), ('poof_cloth', e('du_shot', 0.4), -6),
        # 1836: колокол из турецких пушек
        ('fire_flare', S0['bell'] - 0.2, -6), ('boulder_roll', e('bl_roll'), -8), ('molten_pour', e('bl_melt'), -4), ('shimmer', e('bl_rise'), -6), ('weight_slam', e('bl_ton'), -2), ('table_crash', e('bl_hoist'), -10),
        ('big_bell_bong', e('bl_bonk'), 0), ('bell_crack', e('bl_bonk', 0.05), -8),
        # 1840: Триумфальная арка
        ('chisel_strike', e('ar_point'), -10), ('brick_trowel', e('ar_build'), -6), ('drum_march', e('ar_glory', -0.1), -6), ('medal_fanfare', e('ar_glory'), -8), ('big_bell_bong', e('ar_ring'), -2),
        # 1952: подземный город «Крикова»
        ('dust_whoosh', S0['cellar'] - 0.25, -2), ('saw_stone', e('cl_saw', -0.2), -2), ('poof_cloth', e('cl_wine'), 0), ('shimmer', e('cl_wine', 0.05), -4), ('time_zoom', e('cl_km'), -8), ('teleport_pop', e('cl_street'), -4),
        # 1966: легенда о Гагарине
        ('cork_pop', S0['gagarin'] - 0.25, 0), ('goblet_clink', e('gg_name'), -4), ('whip_whoosh', e('gg_down'), -6), ('clock_tick_heavy', e('gg_days'), -4), ('clock_tick_heavy', e('gg_days', 0.3), -6), ('tiny_tuk', e('gg_hic'), 0),
        # сегодня
        ('whip_whoosh', S0['today'] - 0.15, -2), ('pigeons_flutter', S0['today'] + 0.3, -8), ('stamp_thud', e('td_170'), -6), ('teleport_pop', e('td_garage'), -2), ('big_bell_bong', e('td_garage', 0.25), -10),
        # кнопка
        ('clock_tick_heavy', S0['button'] - 0.2, -2), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('clock_tick_heavy', DUR - 1.1, -6),
    ]
    beds = [('city_loop', 0, S0['tunnel'] + 0.2), ('underwater_loop', S0['sea'], S1['sea']), ('forest_loop', S0['dino'], S1['dino']), ('forest_loop', S0['boyar'], S1['boyar']),
            ('city_loop', S0['pushkin'], S1['pushkin']), ('forest_loop', S0['duel'], S1['duel']), ('forge_loop', S0['bell'], S1['bell']), ('masons_loop', S0['arch'], S1['arch']),
            ('cave_drip_loop', S0['cellar'], S1['cellar']), ('feast_loop', S0['gagarin'], S1['gagarin']), ('city_loop', S0['today'], S1['today'])]
    return dict(sfx=sfx, beds=beds, music='music_moldova')

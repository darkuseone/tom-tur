"""Звук выпуска 004 — Сеул: SFX и атмосферы, привязанные к событиям картинки (T.EV из ev.json — tools/evdump.cjs) и репликам.
SFX: (файл в assets/sfx без .mp3, время, поправка дБ). BEDS: (луп, начало, конец)."""


def sound(T):
    E, S0, S1, LS, LF, DUR = T.EV, T.S0, T.S1, T.LS, T.LF, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: ночная площадь, свисток патруля, неон гаснет, штамп «36 лет»
        ('police_whistle', 0.0, 0), ('siren_curfew', 0.15, -8), ('neon_off', e('hook_off', -0.05), 2), ('stamp_thud', e('hook_36'), -2),
        ('watch_click', e('hook_wind'), 0), ('clock_tick_heavy', e('hook_wind', 0.2), -4), ('vortex_suck', S0['tunnel'] - 0.3, -2), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # −170 млн: магма, остывание, динозавр топает
        ('fire_flare', S0['granite'] - 0.1, -2), ('freeze_crackle', e('gr_cool'), -6), ('dino_steps', e('gr_dino', -0.3), 0), ('boulder_drop', e('gr_dino', 0.05), -6),
        # 1394: компас, столица
        ('whip_whoosh', S0['capital'] - 0.25, -4), ('clock_tick_heavy', S0['capital'] - 0.05, -6), ('hammer_stakes', S0['capital'] + 0.4, -10), ('shimmer', e('cap_name'), -4), ('stamp_thud', e('cap_eq'), -4),
        # 1396: стена
        ('rock_knock', S0['wall'] - 0.25, -2), ('boulder_drop', S0['wall'] - 0.05, -6), ('chisel_strike', e('wall_18', 0.3), -8), ('chisel_strike', e('wall_98'), -8), ('shimmer', e('wall_names'), -4), ('chisel_strike', e('wall_names', 0.1), -6),
        # 1446: хангыль
        ('paper_whoosh', S0['hangul'] - 0.3, -2), ('ink_splat', S0['hangul'] - 0.05, -4), ('pencil_scribble', e('hg_abc'), -6), ('shimmer', e('hg_morning'), -6), ('tiny_tuk', e('hg_ten'), -4), ('tiny_tuk', e('hg_ten', 0.25), -4), ('tiny_tuk', e('hg_ten', 0.5), -4),
        # 1887: лампы Эдисона
        ('wind_gust', S0['light'] - 0.3, -6), ('stamp_thud', e('lt_on', -0.1), -6), ('arc_buzz', e('lt_on'), 0), ('arc_buzz', e('lt_blink'), 2), ('arc_buzz', e('lt_blink', 1.2), 0), ('teleport_pop', e('lt_name'), -6),
        # 1896: российская миссия
        ('arc_buzz', S0['legation'] - 0.35, -4), ('table_crash', S0['legation'] - 0.05, -10), ('drum_march', e('lg_run'), -10), ('typewriter', e('lg_rule'), -8),
        # 1926 → 1995: здание и снос
        ('stamp_thud', S0['ggb'] - 0.05, -2), ('tectonic_split', e('gg_block'), -10), ('crowd_cheer', e('gg_95', 0.1), -8), ('boulder_roll', e('gg_down', -0.1), -2), ('fireworks', e('gg_down', 0.3), -6),
        # комендантский час
        ('siren_curfew', S0['curfew'] - 0.2, -4), ('police_whistle', e('cf_whistle'), -2), ('police_whistle', e('cf_whistle', 0.5), -6), ('paper_whoosh', e('cf_lift'), 0), ('crowd_cheer', e('cf_lift', 0.3), -6), ('fireworks', e('cf_olymp'), -4),
        # Гангнам
        ('shimmer', S0['gangnam'] - 0.1, -6), ('poof_cloth', e('gn_then', 0.05), 0), ('dust_whoosh', e('gn_then', 0.1), -4), ('medal_fanfare', e('gn_bil', 0.3), -6),
        # сегодня
        ('fireworks', S0['today'] - 0.1, -6), ('teleport_pop', e('td_sleep'), -6), ('crowd_cheer', e('td_catch'), -6),
        # кнопка
        ('watch_click', S0['button'] - 0.1, 0), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('clock_tick_heavy', DUR - 1.1, -6),
    ]
    beds = [('night_city_loop', 0, e('hook_off')), ('magma_bubble_loop', S0['granite'], e('gr_cool', 0.6)), ('jungle_loop', e('gr_cool', 0.3), S1['granite']),
            ('forest_loop', S0['capital'], S1['capital']), ('masons_loop', S0['wall'], S1['wall']), ('feast_loop', S0['hangul'], S1['hangul']),
            ('crickets_loop', S0['light'], S1['light']), ('wind_gust', S0['legation'], S1['legation']), ('city_loop', S0['ggb'], S1['ggb']),
            ('night_city_loop', e('cf_lift'), S1['curfew']), ('forest_loop', S0['gangnam'], e('gn_then')), ('night_city_loop', e('gn_then', 0.3), S1['today'])]
    return dict(sfx=sfx, beds=beds, music='music_seoul')

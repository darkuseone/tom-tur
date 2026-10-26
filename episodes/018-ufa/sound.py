"""Звук выпуска 018 — Уфа: SFX и атмосферы от событий картинки (ev.json) и реплик."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: шайба, сирена, трибуны, вопрос
        ('crowd_cheer', 0.0, -12), ('stamp_thud', 0.05, -4), ('wood_bonk', e('hk_hock', -0.1), -4), ('siren_curfew', e('hk_hock'), -12), ('crowd_cheer', e('hk_hock', 0.1), -6), ('shimmer', e('hk_who'), -6),
        ('watch_click', e('hk_wind'), 0), ('rewind', e('hk_wind', 0.15), -4), ('vortex_suck', S0['tunnel'] - 0.3, -2), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # XVI век: трещина, топоры
        ('ice_shatter', S0['fort'] - 0.25, -4), ('hammer_stakes', e('fo_str'), -8), ('hammer_stakes', e('fo_str', 0.5), -10), ('stamp_thud', e('fo_ufa'), -6),
        # 1773–1774: метель, кони, стрелы, курай-поэт
        ('wind_gust', S0['siege'] - 0.3, -6), ('blizzard_loop', S0['siege'], -14), ('whip_whoosh', e('si_siege'), -8), ('whip_whoosh', e('si_siege', 0.3), -10), ('shimmer', e('si_poet'), -6),
        # 1791: лепестки, колыбель
        ('poof_cloth', S0['aksakov'] - 0.3, -8), ('teleport_pop', e('ak_name'), -6), ('shimmer', e('ak_fl'), -4),
        # 1890: занавес, оркестр
        ('cloth_rip', S0['chaliapin'] - 0.3, -10), ('medal_fanfare', S0['chaliapin'] + 0.4, -12), ('stamp_thud', e('ch_name'), -6), ('crowd_cheer', e('ch_sub', 0.3), -12),
        # 1941–1945: пар, эшелон, моторы
        ('train_rush', S0['war'] - 0.3, -6), ('rivets_steel', e('wa_fac'), -10), ('heli_sputter', e('wa_eng'), -10),
        # 1950-е: поезд, рояль-тики
        ('train_rush', S0['nureyev'] - 0.25, -6), ('metronome_tick', e('nu_train'), -10), ('shimmer', e('nu_name'), -6),
        # 1967: пыль, подъём статуи, фанфары; ответ
        ('dust_whoosh', S0['salavat'] - 0.3, -6), ('rope_creak', S0['salavat'] + 0.3, -8), ('weight_slam', e('sa_10'), -6), ('medal_fanfare', e('sa_10', 0.2), -8), ('scroll_unroll', e('sa_poet'), -6), ('stamp_thud', e('sa_sym'), -6),
        # кнопка: портал, возврат к свитеру (петля)
        ('shimmer', S0['button'] - 0.3, -6), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('time_zoom', DUR - 0.9, -8),
    ]
    beds = [('city_loop', 0, S0['tunnel']), ('forest_loop', S0['fort'], S1['fort']), ('blizzard_loop', S0['siege'], S1['siege']), ('crickets_loop', S0['aksakov'], S1['aksakov']),
            ('city_loop', S0['chaliapin'], S1['chaliapin']), ('forge_loop', S0['war'], S1['war']), ('city_loop', S0['nureyev'], S1['nureyev']), ('gulls_river_loop', S0['salavat'], S1['salavat']),
            ('city_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_ufa', music_duck=[(S0['war'] - 0.1, S1['war'], -8)])

"""Звук выпуска 013 — Ростов-на-Дону (обратная хронология): SFX и атмосферы от событий картинки (ev.json) и реплик."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: набережная, стела, призрак второго Ростова, «?»
        ('ship_bell', 0.0, -10), ('stamp_thud', 0.05, -4), ('teleport_pop', e('hk_name'), -6), ('shimmer', e('hk_other'), -6), ('tiny_tuk', e('hk_guess'), -6), ('tiny_tuk', e('hk_guess', 0.12), -8), ('tiny_tuk', e('hk_guess', 0.24), -8),
        ('watch_click', e('hk_wind'), 0), ('rewind', e('hk_wind', 0.15), -4), ('vortex_suck', S0['tunnel'] - 0.3, -2), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # 1941–1943: дым, проволока, мемориал — тихо
        ('dust_whoosh', S0['war'] - 0.3, -6), ('heli_sputter', S0['war'] + 0.2, -18), ('paper_whoosh', S0['war'] + 0.3, -12), ('freeze_crackle', e('wr_occ'), -14),
        # 1935: перемотка взрыва, стройка, трактор, листовки
        ('rewind', S0['theatre'] - 0.3, -6), ('brick_trowel', S0['theatre'] + 0.2, -10), ('hammer_stakes', e('th_two'), -12), ('heli_sputter', e('th_trac'), -10), ('paper_whoosh', e('th_trac', 0.2), -8), ('crowd_cheer', e('th_trac', 0.1), -14),
        # 1929: мотовило, цех, клёпка
        ('whip_whoosh', S0['rostselmash'] - 0.3, -6), ('rivets_steel', S0['rostselmash'] + 0.2, -10), ('stamp_thud', e('rs_name'), -6), ('arc_buzz', e('rs_comb'), -14), ('medal_fanfare', e('rs_mil'), -8),
        # 1890-е: зерно, порт, паровоз, афиша
        ('molten_pour', S0['chicago'] - 0.3, -14), ('coins_pouch', e('ch_grain'), -8), ('ship_bell', e('ch_port'), -6), ('train_rush', e('ch_rail', -0.3), -8), ('stamp_thud', e('ch_chi'), -4),
        # 1779: пыль, телеги, межа
        ('dust_whoosh', S0['nakhichevan'] - 0.3, -4), ('rope_creak', S0['nakhichevan'] + 0.3, -8), ('rope_creak', e('nk_arm', 0.4), -10), ('hammer_stakes', e('nk_name'), -10), ('wood_bonk', e('nk_merge', 0.3), -6),
        # 1761: залп, барабан, икона, карта, ответ
        ('cannon_boom', S0['fortress'] - 0.1, -4), ('drum_march', S0['fortress'] + 0.8, -12), ('shimmer', e('fo_dim'), -6), ('scroll_unroll', e('fo_vel'), -6), ('teleport_pop', e('fo_name'), -4), ('hammer_stakes', e('fo_don'), -6), ('hammer_stakes', e('fo_don', 0.15), -8), ('stamp_thud', e('fo_conf'), -6),
        # 1749: шлагбаум, печать, «Ростов-папа»
        ('wood_bonk', S0['customs'] - 0.2, -4), ('scroll_unroll', e('cu_cust', -0.2), -6), ('stamp_thud', e('cu_cust'), -2), ('teleport_pop', e('cu_papa'), -6), ('rope_creak', e('cu_son'), -8),
        # кнопка: часы вперёд, портал, возврат к стеле (петля)
        ('clock_tick_heavy', S0['button'] - 0.3, -2), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('time_zoom', DUR - 0.9, -8),
    ]
    beds = [('gulls_river_loop', 0, S0['tunnel']), ('city_fire_loop', S0['war'], S1['war']), ('masons_loop', S0['theatre'], S1['theatre']), ('forge_loop', S0['rostselmash'], S1['rostselmash']),
            ('gulls_river_loop', S0['chicago'], S1['chicago']), ('crickets_loop', S0['nakhichevan'], S1['nakhichevan']), ('gulls_river_loop', S0['fortress'], S1['fortress']),
            ('crickets_loop', S0['customs'], S1['customs']), ('gulls_river_loop', S0['button'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_rostov', music_duck=[(S0['war'] - 0.1, S1['war'], -14)])

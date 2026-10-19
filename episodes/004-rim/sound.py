"""Звук выпуска 004 — Рим: SFX и атмосферы, привязанные к событиям картинки (T.EV из ev.json — tools/evdump.cjs) и репликам.
SFX: (файл в assets/sfx без .mp3, время, поправка дБ). BEDS: (луп, начало, конец)."""


def sound(T):
    E, S0, S1, LS, LF, DUR = T.EV, T.S0, T.S1, T.LS, T.LF, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: Торре Арджентина, призрак Цезаря, кошки
        ('dagger_slash', 0.0, -2), ('cat_meows', e('hook_jump'), -4), ('shimmer', e('hook_ghost', 0.1), -6), ('stamp_thud', e('hook_forum', 0.1), -8),
        ('cat_meows', e('hook_cats'), -6), ('watch_click', e('hook_wind', -0.1), 0), ('clock_tick_heavy', e('hook_wind', 0.15), -4), ('vortex_suck', S0['tunnel'] - 0.3, -2), ('time_zoom', S0['tunnel'] - 0.05, -3),
        # вулкан
        ('dust_whoosh', S0['volcano'] - 0.25, -2), ('volcano_rumble', S0['volcano'], -3), ('elephants', e('volc_hills', 0.3), -10), ('volcano_rumble', e('volc_but'), -8), ('shimmer', e('volc_sleep'), -6), ('stamp_thud', e('volc_sleep', 0.1), -4),
        # волчица
        ('wolf_howl', S0['wolf'] - 0.3, -4), ('poof_cloth', e('wolf_cast'), 0), ('molten_pour', e('wolf_cast', 0.1), -6), ('stamp_thud', e('wolf_cast', 0.25), -2), ('hammer_stakes', e('wolf_twins', 0.1), -8), ('shimmer', e('wolf_late'), -6),
        # Цезарь
        ('dagger_slash', S0['caesar'] - 0.25, 0), ('scroll_unroll', LS('s3'), -8), ('pencil_scribble', e('cz_shake'), -4), ('stamp_thud', e('cz_shake', 0.15), -2), ('teleport_pop', e('cz_shake', -0.05), -6), ('poof_cloth', e('cz_toga', -0.1), -2),
        # Веспасиан
        ('poof_cloth', S0['vespasian'] - 0.25, -2), ('coins_pouch', e('vs_tax'), -4), ('bubbles_burst', e('vs_pee'), -8), ('shimmer', e('vs_smell'), -3), ('stamp_thud', e('vs_smell', 0.1), -4),
        # Колизей
        ('shimmer', S0['colosseum'] - 0.2, -4), ('arena_roar', S0['colosseum'] + 0.05, -8), ('scroll_unroll', e('cl_not'), -8), ('whip_whoosh', e('cl_honor'), -2), ('stamp_thud', e('cl_honor'), -4), ('medal_fanfare', e('cl_nero', 0.1), -6),
        # Пантеон
        ('dust_whoosh', S0['pantheon'] - 0.3, -2), ('brick_trowel', S0['pantheon'] + 0.4, -10), ('shimmer', e('pn_agr'), -6), ('pencil_scribble', e('pn_lie'), -2), ('stamp_thud', e('pn_lie', 0.1), -2), ('pencil_scribble', e('pn_hadr'), -4),
        # Сикстинская капелла
        ('choir_ahh', S0['sistine'] - 0.1, -4), ('stamp_thud', e('st_stand', 0.05), -2), ('pencil_scribble', e('st_stand', -0.2), -6), ('typewriter', e('st_years'), -8), ('tiny_tuk', e('st_head'), -6),
        # Форум
        ('ink_splat', S0['forum'] - 0.25, -2), ('scroll_unroll', e('fr_waist'), -8), ('cow_moo', e('fr_cows'), -2), ('stamp_thud', e('fr_field', 0.1), -4),
        # Метро C
        ('tbm_drill', S0['metro'] - 0.3, -2), ('typewriter', e('mt_years'), -10), ('rock_knock', e('mt_ruins'), -6), ('train_rush', e('mt_station', -0.1), -2), ('shimmer', e('mt_museum'), -4), ('stamp_thud', e('mt_museum', 0.05), -4),
        # сегодня
        ('whip_whoosh', S0['today'] - 0.2, -2), ('cat_meows', e('td_rule', 0.1), -4), ('shimmer', e('td_rule', 0.2), -6), ('crowd_cheer', e('td_ours'), -12), ('cat_meow', e('td_ours', 0.2), -2),
        # кнопка
        ('cat_meow', S0['button'] - 0.2, -4), ('portal_open', E['portal'], -6), ('clock_tick_heavy', e('bt_wink'), -4), ('clock_tick_heavy', DUR - 1.1, -6),
    ]
    beds = [('city_loop', 0, S0['tunnel'] + 0.2), ('city_fire_loop', S0['volcano'], S1['volcano']), ('campfire_loop', S0['wolf'], E['wolf_cast']), ('forge_loop', E['wolf_cast'], S1['wolf']),
            ('feast_loop', S0['caesar'], S1['caesar']), ('city_loop', S0['vespasian'], S1['vespasian']), ('feast_loop', S0['colosseum'], S1['colosseum']), ('masons_loop', S0['pantheon'], S1['pantheon']),
            ('cave_drip_loop', S0['sistine'], S1['sistine']), ('forest_loop', S0['forum'], S1['forum']), ('metro_loop', S0['metro'], S1['metro']), ('city_loop', S0['today'], S1['today'])]
    return dict(sfx=sfx, beds=beds, music='music_rome')
